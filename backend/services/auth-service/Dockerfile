FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
<<<<<<< HEAD
COPY pom.xml ./
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/auth-service-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
=======
COPY . .
RUN apt-get update && apt-get install -y maven && mvn -q -DskipTests package
EXPOSE 8081
CMD ["java", "-jar", "target/auth-service-1.0.0.jar"]
>>>>>>> parent of 509199b (aaaa)
