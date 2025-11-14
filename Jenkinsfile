pipeline {
    agent any 
    tools { nodejs 'Node_Cypress' }

    stages {
        stage('1. Checkout do Código') { 
            steps { 
                checkout scm 
            } 
        }

        stage('2. Instalar Dependências') { 
            steps { 
                bat 'npm install --silent' 
            } 
        }

        stage('3. Executar Testes & Gerar Relatório (Allure)') {
            steps {
                echo 'Executando testes, limpando e gerando o relatório Allure...'
                // 🚀 Usa o comando único que já limpa, executa o Cypress com Allure e gera o relatório.
                // NOTE: 'allure open' será ignorado ou causará um aviso no ambiente CI (headless), o que é normal.
                bat 'npm run test:report' 
            }
        }
    }

    post {
        always {
            echo 'Publicando Relatório Allure no Jenkins...'
            // O plugin Allure Jenkins publica os arquivos da pasta 'allure-report'
            allure report: 'allure-report', results: [[path: 'allure-results']] 
        }
    }
}