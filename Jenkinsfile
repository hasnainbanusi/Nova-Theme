pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nova-theme:latest .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker images nova-theme:latest'
            }
        }
    }
} 
