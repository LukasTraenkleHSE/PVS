 # ---------- Stage 1: Build the app ----------
    FROM maven:3.9.4-eclipse-temurin-21 AS build

    WORKDIR /app
    
    # Copy pom.xml and download dependencies (for better caching)
    COPY pom.xml ./
    RUN mvn dependency:go-offline
    
    # Copy the rest of the source code
    COPY src ./src
    
    # Build the application (skip tests to speed things up)
    RUN mvn clean package -DskipTests
    
    # ---------- Stage 2: Run the app ----------
    FROM eclipse-temurin:21-jre
    
    # Copy the built JAR from the build stage
    COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /opt/app.jar
    
    # Run the app
    ENTRYPOINT ["java", "-jar", "/opt/app.jar"]