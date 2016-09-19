# spring-jdbc-crud
The simple starter application on Spring Boot with Angular. This is my personal application for CRUD where a use only JDBC method to communicate with MySql database. For primary build system I use gradle and gulp for front-end. All the taks for installing node, npm and gulp were implemented in the gradle for more convient introduction.

## Installation

At first, install npm package for the project. I suppose, you have installed node globally, then just enter follow:

```
npm install
```

But if not – use this command for installing node and npm localy in project directory:

```
./gradlew npm_install
```

At first build will be downloaded typing, compiled typescript to javascript, concatenated lib.js from all javascript sources, prefixed css and replaced html files. More clearly this tasks you can see in [gulpfile.js](gulpfile.js).

And run the server:

```
./gradlew bootRun
```

Now you can see the result at [localhost](http://localhost:8080/).

## Development mode

You must each time start handling by yourself, using default gulp command:

```
gulp
```

In this way, all changes in [webapp directory](/src/main/webapp/) will be syncronized with [static directory](/src/main/resources/static/) of Spring Boot.

Start the app with command:

```
gradlew bootRun
```

## Testing

To run "end-to-end " test on protractor you must start the app and using gulp command:

```
gulp protractor
```

## Technologies

- Spring Boot v.1.3.5
- Gradle v.3.0
- AngularJS v.1.5.3
- Gulp v.3.9.1
- Bootstrap v.3.0.0
- Angular Protractor
- [package.json](package.json)

## License
The MIT License (MIT)