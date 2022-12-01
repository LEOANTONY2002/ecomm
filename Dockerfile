FROM adoptopenjdk/openjdk11:alpine-jre
RUN mvn clean package
ARG JAR_FILE=target/rest-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} rest-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/rest-0.0.1-SNAPSHOT.jar"]