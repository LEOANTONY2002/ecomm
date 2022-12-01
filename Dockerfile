FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR opt/app
ARG JAR_FILE=target/rest-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} rest.jar
ENTRYPOINT ["java", "-jar", "/rest.jar"]