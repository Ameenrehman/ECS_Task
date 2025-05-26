terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "my-terraform-state-bucket-ameen1"
    key    = "tfstate/main.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

# Data source to fetch existing ECS Task Execution Role
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}

# Data source to fetch the latest ECS-optimized Amazon Linux 2 AMI
data "aws_ami" "ecs_optimized" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-*-x86_64-ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Security Groups
resource "aws_security_group" "ecs_sg" {
  vpc_id = "vpc-03323aabb25aa6abd"
  name   = "ecs-sg-v2"
  ingress {
    from_port       = 3000
    to_port         = 3001
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "ecs-sg-v2" }
}

resource "aws_security_group" "alb_sg" {
  vpc_id = "vpc-03323aabb25aa6abd"
  name   = "alb-sg-v2"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "alb-sg-v2" }
}

# IAM Roles and Policies for EC2 Instance
resource "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRoleV2"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_policy" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "ecsInstanceProfileV2"
  role = aws_iam_role.ecs_instance_role.name
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "my-app-cluster"
}

# ECS Task Definition for node-app1
resource "aws_ecs_task_definition" "node_app1" {
  family                   = "node-app1-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name  = "node-app1"
    image = "593793064016.dkr.ecr.us-east-1.amazonaws.com/myecr-ameen1@sha256:4240419aa95be71ad66633e17296e6002f938de29ee973031c8162c62c85e857"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/node-app1"
        awslogs-region        = "us-east-1"
        awslogs-stream-prefix = "ecs"
      }
    }
  }])
}

# ECS Task Definition for react-app2
resource "aws_ecs_task_definition" "react_app2" {
  family                   = "react-app2-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name  = "react-app2"
    image = "593793064016.dkr.ecr.us-east-1.amazonaws.com/myecr-ameen1@sha256:591b43fa2e3a3069eb67cbcc38c90e2b383d1f740dd068a6593b51566f3b8ee0"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/react-app2"
        awslogs-region        = "us-east-1"
        awslogs-stream-prefix = "ecs"
      }
    }
  }])
}

# ECS Task Definition for spring-micro
resource "aws_ecs_task_definition" "spring_micro" {
  family                   = "spring-micro-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name  = "spring-micro"
    image = "593793064016.dkr.ecr.us-east-1.amazonaws.com/myecr-ameen1:latest"
    essential = true
    portMappings = [{
      containerPort = 3001
      hostPort      = 3001
      protocol      = "tcp"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/spring-micro"
        awslogs-region        = "us-east-1"
        awslogs-stream-prefix = "ecs"
      }
    }
  }])
}

# ECS Service for node-app1
resource "aws_ecs_service" "node_app1" {
  name            = "node-app1-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.node_app1.arn
  desired_count   = 1
  launch_type     = "EC2"
  network_configuration {
    subnets         = ["subnet-0437c1216c89d857c", "subnet-0f27d95ef9ed5eb73"]
    security_groups = [aws_security_group.ecs_sg.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.node_app1.arn
    container_name   = "node-app1"
    container_port   = 3000
  }
  depends_on = [aws_lb_listener.main]
}

# ECS Service for react-app2
resource "aws_ecs_service" "react_app2" {
  name            = "react-app2-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.react_app2.arn
  desired_count   = 1
  launch_type     = "EC2"
  network_configuration {
    subnets         = ["subnet-0437c1216c89d857c", "subnet-0f27d95ef9ed5eb73"]
    security_groups = [aws_security_group.ecs_sg.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.react_app2.arn
    container_name   = "react-app2"
    container_port   = 3000
  }
  depends_on = [aws_lb_listener.main]
}

# ECS Service for spring-micro
resource "aws_ecs_service" "spring_micro" {
  name            = "spring-micro-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.spring_micro.arn
  desired_count   = 1
  launch_type     = "EC2"
  network_configuration {
    subnets         = ["subnet-0437c1216c89d857c", "subnet-0f27d95ef9ed5eb73"]
    security_groups = [aws_security_group.ecs_sg.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.spring_micro.arn
    container_name   = "spring-micro"
    container_port   = 3001
  }
  depends_on = [aws_lb_listener.main]
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "my-app-alb-v2"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = ["subnet-0437c1216c89d857c", "subnet-0f27d95ef9ed5eb73"]
  tags               = { Name = "my-app-alb-v2" }
}

# Target Group for node-app1
resource "aws_lb_target_group" "node_app1" {
  name        = "node-app1-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = "vpc-03323aabb25aa6abd"
  target_type = "ip"
  health_check {
    path                = "/app1"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# Target Group for react-app2
resource "aws_lb_target_group" "react_app2" {
  name        = "react-app2-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = "vpc-03323aabb25aa6abd"
  target_type = "ip"
  health_check {
    path                = "/app2"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# Target Group for spring-micro
resource "aws_lb_target_group" "spring_micro" {
  name        = "spring-micro-tg"
  port        = 3001
  protocol    = "HTTP"
  vpc_id      = "vpc-03323aabb25aa6abd"
  target_type = "ip"
  health_check {
    path                = "/app3"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# ALB Listener with Path-Based Routing
resource "aws_lb_listener" "main" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = "404"
    }
  }
}

# Listener Rule for node-app1
resource "aws_lb_listener_rule" "node_app1" {
  listener_arn = aws_lb_listener.main.arn
  priority     = 100
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.node_app1.arn
  }
  condition {
    path_pattern {
      values = ["/app1", "/app1/*"]
    }
  }
}

# Listener Rule for react-app2
resource "aws_lb_listener_rule" "react_app2" {
  listener_arn = aws_lb_listener.main.arn
  priority     = 200
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.react_app2.arn
  }
  condition {
    path_pattern {
      values = ["/app2", "/app2/*"]
    }
  }
}

# Listener Rule for spring-micro
resource "aws_lb_listener_rule" "spring_micro" {
  listener_arn = aws_lb_listener.main.arn
  priority     = 300
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.spring_micro.arn
  }
  condition {
    path_pattern {
      values = ["/app3", "/app3/*"]
    }
  }
}

# EC2 Launch Template and Auto Scaling Group
resource "aws_launch_template" "ecs_lt" {
  name          = "ecs-launch-template-v2"
  image_id      = data.aws_ami.ecs_optimized.id
  instance_type = "t3.medium"
  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance_profile.name
  }
  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.ecs_sg.id]
  }
  user_data = base64encode(<<-EOF
              #!/bin/bash
              echo ECS_CLUSTER=${aws_ecs_cluster.main.name} >> /etc/ecs/ecs.config
              EOF
  )
}

resource "aws_autoscaling_group" "ecs_asg" {
  name                 = "ecs-asg-v2"
  max_size             = 1
  min_size             = 1
  desired_capacity     = 1
  vpc_zone_identifier  = ["subnet-0437c1216c89d857c", "subnet-0f27d95ef9ed5eb73"]
  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }
  tag {
    key                 = "Name"
    value               = "ecs-instance-v2"
    propagate_at_launch = true
  }
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "node_app1_logs" {
  name              = "/ecs/node-app1"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "react_app2_logs" {
  name              = "/ecs/react-app2"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "spring_micro_logs" {
  name              = "/ecs/spring-micro"
  retention_in_days = 7
}