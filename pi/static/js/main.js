document.addEventListener('DOMContentLoaded', function() {

    lucide.createIcons();

    let abnormalValues = 0;

    // Verifica a temperatura
    const temperatureElement = document.getElementById('temp-value');
    if (temperatureElement) {
        const valueTemp = temperatureElement.textContent;
        const newValueTemp = valueTemp.slice(0, -1); // Remove o último caractere
        const tempValueNumber = parseFloat(newValueTemp); // Converte o valor para número
        const tempElementContainer = document.getElementById('temperature');
        
        if (tempValueNumber < 35) {
            tempElementContainer.classList.add('normal-border');
        } else {
            console.log("TEMPERATURA NORMAL");
            tempElementContainer.classList.add('abnormal-border');
            abnormalValues += 1;
        }
    } else {
        console.error("Elemento com id 'temp-value' não encontrado.");
    }

    // Verifica a umidade
    const humidityElement = document.getElementById('humi-value');
    if (humidityElement) {
        const valueHumi = humidityElement.textContent;
        const newValueHumi = valueHumi.slice(0, -1); // Remove o último caractere
        const humiValueNumber = parseFloat(newValueHumi); // Converte o valor para número
        const humiElementContainer = document.getElementById('humidity');
        
        if (humiValueNumber < 35) {
            humiElementContainer.classList.add('normal-border');
        } else {
            humiElementContainer.classList.add('abnormal-border');
            abnormalValues += 1;
        }
    } else {
        console.error("Elemento com id 'humi-value' não encontrado.");
    }

    const dataStatus1 = document.getElementById('abnormal');
    const datastatus2 = document.getElementById('normal');
    if(abnormalValues > 0) {
        datastatus2.style.display = "none";
        dataStatus1.style.display = "flex";
    } else {
        datastatus2.style.display = "flex";
        dataStatus1.style.display = "none";
    }

    function getCurrentPage() {
        var path = window.location.pathname;
        var page = path.split("/").pop(); // Obtém a parte final da URL

       if (page) {
            document.getElementById(page).style.backgroundColor = "#DDF0EE";

            const iconPath = `#${page} .nav-icon`;
            const paragraphPath = `#${page} p`;
            const element = document.querySelector(iconPath);
            const paragraphElement = document.querySelector(paragraphPath);

            // Verifica se o elemento foi encontrado
            if (element && paragraphElement) {
                element.style.color = "#1A998E";
                paragraphElement.style.display = "flex";
            } else {
                console.error("Elemento não encontrado com o ID dinâmico:", idDinamico);
            }
       }
    }
    window.onload = getCurrentPage;


    // Efeito dropdown na lista
    const items = document.querySelectorAll('.medicine-atributes__title-item img');
    items.forEach(item => {
        const dropdown = item.parentElement.nextElementSibling;

        item.addEventListener('click', function(){
            item.addEventListener('click', () => {
                const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
                
                dropdown.style.display = isHidden ? 'flex' : 'none';
                item.classList.toggle('rotate-icon-hide', !isHidden);
                item.classList.toggle('rotate-icon-show', isHidden);
            });
        });
    });

    // Efeito dropdown na sublista
    const dropItems = document.querySelectorAll('.medicine-atributes__drop-header img');
    dropItems.forEach(item => {
        const dropdownContent = item.parentElement.nextElementSibling;
        const container = item.closest('.medicine-atributes__drop-item');

        item.addEventListener('click', () => {
            const isHidden = dropdownContent.style.display === 'none' || !dropdownContent.style.display;
            
            dropdownContent.style.display = isHidden ? 'flex' : 'none';
            item.classList.toggle('rotate-icon-hide', !isHidden);
            item.classList.toggle('rotate-icon-show', isHidden);
            container.style.backgroundColor = isHidden ? '#EAEAEA' : '#FFFFFF';
        });
    });


    //HOME MODAL
    const modalElement = document.getElementById('modal-container');
    const profileImageElement = document.querySelector('.home-header__profile-image');
    const closeIcon = document.querySelector('.home-modal__header img');

    profileImageElement.addEventListener('click', function() {
        modalElement.style.display = 'grid';
    })
    closeIcon.addEventListener('click', function() {
        modalElement.style.display = 'none';
    })
});

    //CASE STUDY
    const questions = [
        {
            type: "Prescrição de Medicamentos",
            question: "Um cliente chega com uma prescrição médica para um medicamento controlado. Você percebe que a dose prescrita é maior do que a dose usual para esse medicamento e que pode representar um risco para o cliente. O que deve ser feito?",
            answers: [
                {text: "Preencher a receita conforme prescrita e instruir o cliente a tomar conforme indicado pelo médico.", correct: false},
                {text: "Recusar-se a preencher a receita e entrar em contato com o médico para esclarecimentos.", correct: true},
                {text: "Preencher a receita, mas fornecer ao cliente informações detalhadas sobre os riscos e aconselhá-lo a entrar em contato com o médico para revisão.", correct: false},
                {text: "Consultar um colega farmacêutico para obter uma segunda opinião antes de tomar uma decisão.", correct: false},
            ]
        },
        {
            type: "Prescrição de Benzodiazepínico",
            question: "Um cliente idoso apresenta uma receita para um benzodiazepínico de ação prolongada para tratar a insônia, mas o uso prolongado pode aumentar o risco de quedas e fraturas. O que deve ser feito?",
            answers: [
                {text: "Discutir os riscos com o cliente e preencher a receita conforme prescrita.", correct: false},
                {text: "Sugerir ao cliente a utilização de um benzodiazepínico de ação curta após consultar o médico.", correct: false},
                {text: "onsultar o médico para discutir alternativas mais seguras devido à idade do cliente.", correct: false},
                {text: "Fornecer a medicação, mas alertar o cliente sobre os riscos e medidas preventivas contra quedas.", correct: true},
            ]
        },
    ];
    
    const questionElement = document.getElementById('study__description-text');
    const answerButton = document.getElementById('study__answers');
    const nextButton = document.getElementById('study__next-button');
    const questionNumber = document.getElementById('study__header-number')
    const kindStudy = document.getElementById("study__type-title");
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Próxima";
        showQuestion();
    }
    
    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;

        if(questionNo < 10) {
            questionNumber.innerHTML = "0" + questionNo;
        } else {
            questionNumber.innerHTML = questionNo;
        }
    
        questionElement.innerHTML = currentQuestion.question;
    
        kindStudy.innerHTML = currentQuestion.type;
    
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("study__answer-button");
            answerButton.appendChild(button);
            if(answer.correct) {
                button.dataset.correct = answer.correct;
            }
    
            button.addEventListener('click', selectAnswer);
        });
    }
    
    function resetState() {
        nextButton.style.display = "none";
        while(answerButton.firstChild) {
            answerButton.removeChild(answerButton.firstChild);
        }
    }
    
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
        }
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "grid"
    }
    
    function showScore() {
        resetState();
        questionElement.innerHTML = `Você acertou ${score} de ${questions.length} casos.`;
        nextButton.innerHTML = "Tentar novamente";
        nextButton.style.display = "grid";
    }
    
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
    
    nextButton.addEventListener('click', ()=> {
        if(currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });
    
    //QUESTION DROPDOWN
    document.addEventListener('DOMContentLoaded', function() {
        const item = document.querySelector('.study__type-icon');
        const dropdown = item.parentElement.nextElementSibling;

        dropdown.style.display = 'block';
    
        item.addEventListener('click', function() {
            const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
    
            dropdown.style.display = isHidden ? 'block' : 'none';
            item.classList.toggle('rotate-icon-show', !isHidden);
            item.classList.toggle('rotate-icon-hide', isHidden);
        });
    });
    
    
    startQuiz();