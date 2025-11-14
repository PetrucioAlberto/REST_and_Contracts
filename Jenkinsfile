pipeline {
    agent any 
    tools { nodejs 'Node_Cypress' }
    stages {
        stage('Checkout do Código') { steps { checkout scm } }
        stage('Instalar Dependências') { steps { sh 'npm ci' } }
        
        
        stage('Executar Testes Cypress (Gera Allure-Results)') {
            steps {
                sh 'npm run test:ci' 
            }
        }
        
        stage('Gerar Relatório Allure') { 
            steps { sh 'npm run allure:generate' } 
        }
    }
    post {
        always {
            echo 'Publicando Relatório Allure no Jenkins...'
            allure report: 'allure-report' , results: [[path: 'allure-results']] 
        }
    }
}