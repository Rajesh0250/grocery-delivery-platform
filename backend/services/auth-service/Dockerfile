FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y maven && mvn -q -DskipTests package
EXPOSE 8080
CMD ["java", "-jar", "target/auth-service-1.0.0.jar"]
