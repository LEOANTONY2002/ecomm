FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /opt/app
ARG JAR_FILE=target/rest.jar
COPY ${JAR_FILE} rest.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]