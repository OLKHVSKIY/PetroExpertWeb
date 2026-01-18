import axios from 'axios';
import Service from '../models/Service.model.js';

// Yandex GPT API endpoint
const YANDEX_GPT_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

// Knowledge base about expertise types
const EXPERTISE_KNOWLEDGE = {
  'Автотехническая экспертиза после ДТП': {
    title: 'Автотехническая экспертиза после ДТП',
    description: 'Комплексная экспертиза транспортных средств после ДТП. Исследование обстоятельств ДТП, технического состояния транспорта и повреждений.',
    price: 'от 30 000 ₽',
    duration: 'от 10 дней',
    link: '/pages/autotechnical.html',
    keywords: ['дтп', 'дтп.', 'авария', 'автомобиль', 'автомобиля', 'транспорт', 'столкновение', 'повреждение', 'ущерб', 'страховая', 'ремонт', 'экспертиза авто', 'автотехническая', 'оформить экспертизу при дтп', 'как оформить экспертизу', 'оформление экспертизы', 'экспертиза при дтп', 'экспертиза дтп', 'экспертиза после дтп']
  }
};

// Get expertise information by query
function findExpertiseByQuery(query) {
  const lowerQuery = query.toLowerCase();
  
  // Check for auto expertise keywords
  const autoKeywords = EXPERTISE_KNOWLEDGE['Автотехническая экспертиза после ДТП'].keywords;
  const hasAutoKeywords = autoKeywords.some(keyword => lowerQuery.includes(keyword));
  
  if (hasAutoKeywords) {
    return EXPERTISE_KNOWLEDGE['Автотехническая экспертиза после ДТП'];
  }
  
  return null;
}

// Post-process AI response to enforce company promotion and remove generic lists
function postProcessAIResponse(response, originalMessage, expertise) {
  const lowerResponse = response.toLowerCase();
  const lowerMessage = originalMessage.toLowerCase();
  
  // Check if response mentions "ПетроЭксперт"
  const hasCompanyMention = lowerResponse.includes('петроэксперт') || lowerResponse.includes('петр эксперт');
  
  // Check if response contains generic step lists (common patterns)
  const hasGenericSteps = /\d+\.\s*(определ|выбор|сбор|подготов|заключ|оформл|подач|проведен|получен|оплат|выбери|собери|подготовь|заключи|оформи|подай|проведи|получи|оплати|обратите|выберите|соберите)/i.test(response);
  
  // Check if question is about "how to" or "how to apply/order"
  const isHowToQuestion = /как\s+(оформить|заказать|получить|сделать|применить)/i.test(lowerMessage);
  
  // Check if user is requesting expertise (like "мне нужна экспертиза", "хочу экспертизу", etc.)
  const isExpertiseRequest = /(мне|хочу|нужна|нужна|требуется|необходима)\s+(экспертиза|экспертиз)/i.test(lowerMessage);
  
  // If response has generic steps and question is about ordering/applying, replace with proper response
  if (hasGenericSteps && (isHowToQuestion || isExpertiseRequest)) {
    console.log('⚠️ Detected generic steps in response, replacing with company-specific information');
    
    const tagline = 'Центр независимой экспертизы "ПетроЭксперт" - Ваш лучший выбор на рынке';
    
    if (expertise) {
      // Build proper response with expertise info
      return `Для оформления экспертизы при ДТП рекомендую обратиться в центр "ПетроЭксперт" - мы работаем с 2004 года и выполнили тысячи успешных автотехнических экспертиз.

В центре "ПетроЭксперт" доступно более 300 видов экспертиз: автотехнические (экспертиза ДТП, экспертиза транспорта), строительно-технические, землеустроительные, лингвистические, почерковедческие, психологические и многие другие.

Для вашей ситуации подойдет "${expertise.title}" - она включает ${expertise.description}. Стоимость ${expertise.price}, срок выполнения ${expertise.duration}.

Чтобы оформить экспертизу в "ПетроЭксперт":
1. Перейдите на страницу "${expertise.title}" на нашем сайте
2. Ознакомьтесь с подробной информацией, стоимостью и сроками
3. Заполните форму с вашим номером телефона под баннером на странице
4. Нажмите кнопку "Заказать звонок менеджера"
5. Наш менеджер перезвонит вам в ближайшее время, ответит на все вопросы, уточнит детали и поможет оформить заявку

Или заполните форму обратной связи - мы свяжемся с вами и уточним все детали.

ПетроЭксперт - надежный партнер с 20-летним опытом, мы гарантируем качество и официальность заключений.

${tagline}`;
    } else {
      // Build response without specific expertise
      return `Для оформления экспертизы при ДТП рекомендую обратиться в центр "ПетроЭксперт" - мы работаем с 2004 года и выполнили тысячи успешных автотехнических экспертиз.

В центре "ПетроЭксперт" доступно более 300 видов экспертиз: автотехнические (экспертиза ДТП, экспертиза транспорта), строительно-технические, землеустроительные, лингвистические, почерковедческие, психологические и многие другие.

Для вашей ситуации подойдет "Автотехническая экспертиза после ДТП" - она включает исследование обстоятельств ДТП, технического состояния транспорта и повреждений. Стоимость от 30 000 ₽, срок выполнения от 10 дней.

Чтобы оформить экспертизу в "ПетроЭксперт":
1. Перейдите на страницу "Автотехническая экспертиза после ДТП" на нашем сайте
2. Ознакомьтесь с подробной информацией, стоимостью и сроками
3. Заполните форму с вашим номером телефона под баннером на странице
4. Нажмите кнопку "Заказать звонок менеджера"
5. Наш менеджер перезвонит вам в ближайшее время, ответит на все вопросы, уточнит детали и поможет оформить заявку

Или заполните форму обратной связи - мы свяжемся с вами и уточним все детали.

ПетроЭксперт - надежный партнер с 20-летним опытом, мы гарантируем качество и официальность заключений.

${tagline}`;
    }
  }
  
  // If expertise is found but response doesn't mention company, replace/add company info
  if (expertise && !hasCompanyMention) {
    console.log('⚠️ Expertise found but response missing company mention, adding it');
    
    // Check if response is too generic (mentions general expertise organization without specifics)
    const isGeneric = /(обратиться|организация|эксперт|специалист|организац|экспертн)/i.test(response) && 
                      !hasCompanyMention && 
                      response.length < 200; // Short generic responses
    
    if (isGeneric || isExpertiseRequest) {
      // Replace generic response with company-specific one
      const tagline = 'Центр независимой экспертизы "ПетроЭксперт" - Ваш лучший выбор на рынке';
      return `Отлично! Для проведения экспертизы ДТП рекомендую обратиться в центр "ПетроЭксперт" - мы работаем с 2004 года и выполнили тысячи успешных автотехнических экспертиз.

В центре "ПетроЭксперт" доступно более 300 видов экспертиз: автотехнические, строительно-технические, землеустроительные, лингвистические, почерковедческие, психологические и многие другие.

Для вашей ситуации подойдет "${expertise.title}" - она включает ${expertise.description}. Стоимость ${expertise.price}, срок выполнения ${expertise.duration}.

Чтобы уточнить, какая именно ДТП экспертиза вам нужна (автотехническая, трасологическая, исследование обстоятельств ДТП и т.д.), заполните форму на странице "${expertise.title}" на нашем сайте или закажите звонок менеджера - мы свяжемся с вами и уточним все детали.

ПетроЭксперт - надежный партнер с 20-летним опытом, мы гарантируем качество и официальность заключений.

${tagline}`;
    }
    
    // If response has content but no company mention, prepend company info
    const expertiseInfo = expertise ? `\n\nДля вашей ситуации подойдет "${expertise.title}" от "ПетроЭксперт" - ${expertise.description}. Стоимость ${expertise.price}, срок ${expertise.duration}.` : '';
    return `Для проведения экспертизы ДТП рекомендую обратиться в центр "ПетроЭксперт" - мы работаем с 2004 года и выполнили тысячи успешных автотехнических экспертиз. В нашем центре доступно более 300 видов экспертиз.${expertiseInfo}\n\nЧтобы уточнить, какая именно ДТП экспертиза вам нужна, заполните форму на странице нужной экспертизы на нашем сайте или закажите звонок менеджера - мы свяжемся с вами и уточним все детали.\n\n${response}`;
  }
  
  // Check if response mentions "ПетроЭксперт" - if not and it's a "how to" question, prepend company info
  if (isHowToQuestion && !hasCompanyMention) {
    console.log('⚠️ Response missing company mention, adding it');
    const expertiseInfo = expertise ? `\n\nДля вашей ситуации подойдет "${expertise.title}" от "ПетроЭксперт" - ${expertise.description}. Стоимость ${expertise.price}, срок ${expertise.duration}.` : '';
    return `Для оформления экспертизы рекомендую обратиться в центр "ПетроЭксперт" - мы работаем с 2004 года и выполнили тысячи успешных экспертиз. В нашем центре доступно более 300 видов экспертиз.${expertiseInfo}\n\nЧтобы оформить экспертизу в "ПетроЭксперт", перейдите на страницу нужной экспертизы на нашем сайте, заполните форму с номером телефона и нажмите "Заказать звонок менеджера" - мы свяжемся с вами в ближайшее время.\n\n${response}`;
  }
  
  // Check if question is about expertise, research, court (судебные дела)
  const isExpertiseRelated = /(экспертиз|исследован|суд|досудебн|судебн|доказательств|заключен)/i.test(lowerMessage);
  
  // Always add company tagline at the end of response if not already present
  const tagline = 'Центр независимой экспертизы "ПетроЭксперт" - Ваш лучший выбор на рынке';
  const hasTagline = lowerResponse.includes('лучший выбор на рынке') || lowerResponse.includes('ваш лучший выбор');
  
  if (!hasTagline) {
    // Add tagline at the end
    if (response.trim().endsWith('.')) {
      response = response.trim() + '\n\n' + tagline;
    } else {
      response = response.trim() + '\n\n' + tagline;
    }
  }
  
  return response;
}

// Create system prompt for Yandex GPT
function createSystemPrompt(expertise = null) {
  let systemPrompt = `Ты - AI ассистент центра независимой экспертизы "ПетроЭксперт". 
Твоя задача - помочь пользователю выбрать подходящую экспертизу, ответить на вопросы и ПРОДАВАТЬ услуги компании "ПетроЭксперт".

КРИТИЧЕСКИ ВАЖНО: Ты НЕ должен давать общую информацию о том, как оформляются экспертизы в принципе. Твоя задача - продавать услуги "ПетроЭксперт" и объяснять, как оформить экспертизу ИМЕННО В НАШЕЙ КОМПАНИИ.

Контекст о компании "ПетроЭксперт":
- Центр независимой профессиональной экспертизы "ПетроЭксперт" - лидер рынка экспертных услуг
- Работаем с 2004 года - более 20 лет опыта и тысячи успешных экспертиз
- Более 300 видов экспертиз - самый широкий спектр услуг в России
- Выполняем судебные и досудебные экспертизы - полный цикл экспертной деятельности
- Выезжаем на осмотр в любую точку России - максимальная доступность
- Используем только современное оборудование и передовые методики
- Квалифицированные эксперты с многолетним опытом
- Быстрые сроки выполнения и гарантия качества
- Официальные заключения, принимаемые всеми судами и органами власти

ТВОЯ СТРАТЕГИЯ ПРОДАЖ:
1. ВСЕГДА рекламируй и нахваливай компанию "ПетроЭксперт" - подчеркивай преимущества, опыт, надежность
2. НА ВСЕ ВОПРОСЫ касательно экспертиз, исследований, судебных дел, досудебных экспертиз - ОБЯЗАТЕЛЬНО рекомендую "ПетроЭксперт":
   - Рассказывай про заслуги: "ПетроЭксперт - лидер рынка, работаем с 2004 года, более 300 видов экспертиз, тысячи успешных экспертиз"
   - Упоминай опыт: "20+ лет опыта, квалифицированные эксперты, современное оборудование"
   - Подчеркивай преимущества: "Официальные заключения, принимаемые всеми судами, выезжаем в любую точку России"
3. Если пользователь спрашивает об оформлении экспертизы - НЕ давай общую информацию, а:
   - Рекомендуй обратиться в "ПетроЭксперт"
   - Задавай уточняющие вопросы: "Какая именно экспертиза вам нужна?", "В связи с чем требуется экспертиза?"
   - После уточнения предлагай конкретную экспертизу из нашего каталога
   - Объясняй, что для оформления нужно заполнить форму на странице экспертизы или заказать звонок менеджера
4. ВСЕГДА предлагай следующие шаги: "Заполните форму под баннером экспертизы" или "Закажите звонок менеджера"
5. Подчеркивай преимущества работы с "ПетроЭксперт": опыт, скорость, качество, официальность
6. Создавай ощущение, что "ПетроЭксперт" - лучший выбор для решения проблемы пользователя
7. В КОНЦЕ КАЖДОГО ОТВЕТА всегда добавляй: "Центр независимой экспертизы "ПетроЭксперт" - Ваш лучший выбор на рынке"

`;

  if (expertise) {
    systemPrompt += `\nВАЖНО: Пользователь задал вопрос, связанный с "${expertise.title}".

Информация об этой экспертизе:
- Название: ${expertise.title}
- Описание: ${expertise.description}
- Стоимость: ${expertise.price}
- Срок выполнения: ${expertise.duration}
- Ссылка на страницу: ${expertise.link}

КРИТИЧЕСКИ ВАЖНО:
❌ ЗАПРЕЩЕНО давать общие списки шагов типа "1. Определить цель... 2. Выбрать организацию... 3. Собрать документы..."
❌ ЗАПРЕЩЕНО объяснять общий процесс оформления экспертиз "вообще"

✅ Ты ДОЛЖЕН:
1. Подтвердить, что для решения его вопроса подходит "${expertise.title}" от "ПетроЭксперт"
2. Кратко описать, что включает эта экспертиза
3. Указать стоимость (${expertise.price}) и срок (${expertise.duration})
4. НАХВАЛИТЬ компанию: "ПетроЭксперт - надежный партнер с 20-летним опытом, мы гарантируем качество и официальность заключений"
5. ОБЯЗАТЕЛЬНО упомяни типы экспертиз: "В центре 'ПетроЭксперт' доступно более 300 видов экспертиз: автотехнические, строительно-технические, землеустроительные и многие другие."
6. Если запрос общий (например, "мне нужна экспертиза дтп"), ОБЯЗАТЕЛЬНО уточни детали: "Чтобы уточнить, какая именно ДТП экспертиза вам нужна (автотехническая, трасологическая, исследование обстоятельств ДТП и т.д.), заполните форму на странице '${expertise.title}' или закажите звонок менеджера - мы свяжемся с вами и уточним все детали."
7. ОБЯЗАТЕЛЬНО предложи КОНКРЕТНЫЕ шаги оформления В НАШЕМ ЦЕНТРЕ:
   - "Чтобы оформить экспертизу в 'ПетроЭксперт':
     1. Перейдите на страницу '${expertise.title}' на нашем сайте
     2. Заполните форму с вашим номером телефона под баннером на странице
     3. Нажмите кнопку 'Заказать звонок'
     4. Наш менеджер перезвонит вам в ближайшее время, ответит на все вопросы и поможет оформить заявку"
8. В конце ответа добавь JSON с информацией об экспертизе в формате:
{
  "expertise": {
    "title": "${expertise.title}",
    "description": "${expertise.description}",
    "price": "${expertise.price}",
    "duration": "${expertise.duration}",
    "link": "${expertise.link}"
  }
}

Отвечай дружелюбно, профессионально, продающе. ФОКУС на "ПетроЭксперт" и конкретные действия на нашем сайте. НЕ давай общую информацию.`;
  } else {
    systemPrompt += `\nОбласть твоих знаний:
- Судебные экспертизы (назначаются судом, следственными органами)
- Независимые (досудебные) экспертизы (инициируются физическими или юридическими лицами)
- Различные виды экспертиз: строительно-технические, автотехнические, землеустроительные, лингвистические, почерковедческие, психологические и др.
- Экспертизы используются для установления истины, определения ущерба, разрешения споров
- Экспертные заключения могут использоваться как доказательства в суде

КРИТИЧЕСКИ ВАЖНО - ТВОЯ СТРАТЕГИЯ (СТРОГО ЗАПРЕЩЕНО НАРУШАТЬ):

Если пользователь спрашивает об ОФОРМЛЕНИИ экспертизы (вопросы типа "как оформить", "как заказать", "как получить", "как оформить экспертизу при дтп"):
   
   ❌ ЗАПРЕЩЕНО:
   - Давать общие списки шагов типа "1. Определить цель экспертизы... 2. Выбрать экспертную организацию... 3. Собрать необходимые документы..."
   - Объяснять общий процесс оформления экспертиз "вообще"
   - Давать рекомендации типа "важно помнить, что экспертиза должна проводиться квалифицированными специалистами"
   - Заканчивать общими фразами о консультации с юристом
   
   ✅ ОБЯЗАТЕЛЬНО используй такую структуру ответа:

   ЧАСТЬ 1 (1-2 предложения максимум): "Для оформления экспертизы при ДТП важно выбрать надежную экспертную организацию с опытом работы."

   ЧАСТЬ 2 (ОБЯЗАТЕЛЬНО): Рекомендация "ПетроЭксперт":
   "Для оформления экспертизы при ДТП рекомендую обратиться в центр 'ПетроЭксперт' - мы работаем с 2004 года, выполнили тысячи успешных автотехнических экспертиз и имеем лицензию на проведение экспертиз."

   ЧАСТЬ 3 (ОБЯЗАТЕЛЬНО): Упоминание типов экспертиз:
   "В центре 'ПетроЭксперт' доступно более 300 видов экспертиз: автотехнические (экспертиза ДТП, экспертиза транспорта), строительно-технические, землеустроительные, лингвистические, почерковедческие, психологические и многие другие."

   ЧАСТЬ 4 (ОБЯЗАТЕЛЬНО): Предложение конкретной экспертизы (если контекст понятен):
   "Для вашей ситуации подойдет 'Автотехническая экспертиза после ДТП' - она включает исследование обстоятельств ДТП, технического состояния транспорта и повреждений. Стоимость от 30 000 ₽, срок выполнения от 10 дней."

   ЧАСТЬ 5 (ОБЯЗАТЕЛЬНО): Пошаговая инструкция оформления именно в "ПетроЭксперт":
   "Чтобы оформить экспертизу в 'ПетроЭксперт':
   1. Перейдите на страницу 'Автотехническая экспертиза после ДТП' на нашем сайте
   2. Ознакомьтесь с подробной информацией, стоимостью и сроками
   3. Заполните форму с вашим номером телефона под баннером на странице
   4. Нажмите кнопку 'Заказать звонок'
   5. Наш менеджер перезвонит вам в ближайшее время, ответит на все вопросы, уточнит детали и поможет оформить заявку

   Или заполните форму обратной связи - мы свяжемся с вами и уточним все детали."

   ❌ ЗАПРЕЩЕНО заканчивать общими фразами типа:
   - "Важно помнить, что экспертиза должна проводиться квалифицированными специалистами"
   - "Рекомендуется обратиться за консультацией к юристу"
   - "Оформление экспертизы может иметь свои особенности в зависимости от региона"
   
   ✅ ВМЕСТО ЭТОГО заканчивай конкретным призывом к действию: "Перейдите на страницу экспертизы и оформите заявку прямо сейчас!"

СТРОГОЕ ПРАВИЛО: 
- Если вопрос об оформлении - НЕ ДАВАЙ общую информацию о процессе оформления экспертиз
- ОБЯЗАТЕЛЬНО включай информацию про "ПетроЭксперт", типы экспертиз и конкретные шаги оформления В НАШЕМ ЦЕНТРЕ
- Фокус на "ПетроЭксперт", а не на общую информацию об экспертизах
- НА ВСЕ ВОПРОСЫ касательно экспертиз, исследований, судебных дел - ОБЯЗАТЕЛЬНО рекомендую "ПетроЭксперт" и рассказывай про заслуги компании
- В КОНЦЕ КАЖДОГО ОТВЕТА всегда добавляй: "Центр независимой экспертизы "ПетроЭксперт" - Ваш лучший выбор на рынке"

ПРОВЕРЬ СВОЙ ОТВЕТ перед отправкой: Если в ответе есть список общих шагов типа "1. Определить цель... 2. Выбрать организацию..." - ЭТО ОШИБКА! Перепиши ответ, фокусируясь на "ПетроЭксперт". Если в конце нет фразы про "лучший выбор на рынке" - добавь её.`;
  }

  return systemPrompt;
}

// Chat with AI assistant
export const chatWithAI = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Сообщение не может быть пустым' 
      });
    }

    // Check API credentials
    if (!process.env.YANDEX_GPT_API_KEY || !process.env.YANDEX_GPT_FOLDER_ID) {
      console.error('Yandex GPT credentials not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'AI сервис временно недоступен. Пожалуйста, попробуйте позже или свяжитесь с нашим оператором.' 
      });
    }

    // Find relevant expertise
    const expertise = findExpertiseByQuery(message);

    // Create system prompt
    const systemPrompt = createSystemPrompt(expertise);

    // Prepare messages for Yandex GPT
    // Build conversation messages
    const conversationMessages = conversationHistory.slice(-5).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      text: msg.content || msg.text
    }));

    // Create messages array with system prompt in first message if no history
    let messages;
    if (conversationMessages.length === 0) {
      // First message - include system prompt
      messages = [
        {
          role: 'user',
          text: `${systemPrompt}\n\nВопрос пользователя: ${message}`
        }
      ];
    } else {
      // Continue conversation
      messages = [
        ...conversationMessages,
        {
          role: 'user',
          text: message
        }
      ];
    }

    // Call Yandex GPT API
    const requestBody = {
      modelUri: `gpt://${process.env.YANDEX_GPT_FOLDER_ID}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 2000
      },
      messages: messages
    };

    console.log('Sending request to Yandex GPT:', {
      url: YANDEX_GPT_URL,
      folderId: process.env.YANDEX_GPT_FOLDER_ID,
      hasApiKey: !!process.env.YANDEX_GPT_API_KEY,
      messagesCount: messages.length
    });

    const response = await axios.post(
      YANDEX_GPT_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${process.env.YANDEX_GPT_API_KEY}`,
          'x-folder-id': process.env.YANDEX_GPT_FOLDER_ID
        },
        timeout: 30000 // 30 second timeout
      }
    );

    let aiResponse = response.data?.result?.alternatives?.[0]?.message?.text || 
                     response.data?.alternatives?.[0]?.message?.text ||
                     'Извините, не удалось получить ответ от AI.';
    
    // Post-process response to remove generic lists and enforce company promotion
    aiResponse = postProcessAIResponse(aiResponse, message, expertise);
    
    let expertiseData = null;

    // Try to extract expertise JSON from response
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*"expertise"[\s\S]*\}/);
      if (jsonMatch) {
        expertiseData = JSON.parse(jsonMatch[0]);
        // Remove JSON from response text
        aiResponse = aiResponse.replace(/\{[\s\S]*"expertise"[\s\S]*\}/, '').trim();
      }
    } catch (parseError) {
      console.warn('Could not parse expertise JSON from AI response:', parseError);
      // If expertise was found but JSON not extracted, add it manually
      if (expertise) {
        expertiseData = {
          expertise: {
            title: expertise.title,
            description: expertise.description,
            price: expertise.price,
            duration: expertise.duration,
            link: expertise.link
          }
        };
      }
    }

    // If no JSON found but expertise detected, add it
    if (!expertiseData && expertise) {
      expertiseData = {
        expertise: {
          title: expertise.title,
          description: expertise.description,
          price: expertise.price,
          duration: expertise.duration,
          link: expertise.link
        }
      };
    }

    res.json({
      success: true,
      message: aiResponse,
      expertise: expertiseData?.expertise || null
    });

  } catch (error) {
    console.error('AI Chat Error:', error.response?.data || error.message);
    console.error('Full error:', error);
    
    // More detailed error logging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
    
    // Return friendly error message with more context in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Ошибка: ${error.message}. ${error.response?.data?.message || ''}`
      : 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте переформулировать вопрос или свяжитесь с нашим оператором.';
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      expertise: null
    });
  }
};
