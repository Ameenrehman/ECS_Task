# Stage 1: Build with Maven
FROM maven:3.8.8-eclipse-temurin-17 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy project files
# Copy source files
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Run the app using a lightweight JDK image
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (change 3001 to 8080 if your app uses default Spring Boot port)
EXPOSE 3001

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=3001"]
