// Contenido de la app: Integración de Sistemas
// Para agregar preguntas nuevas sin tocar el resto del código, usá generador.html

const NOTES = [
  {
    id: 'n1',
    title: '¿Qué es la Integración de Sistemas?',
    body: `Integrar sistemas significa hacer que distintos programas, que fueron pensados por separado,
    puedan trabajar juntos e intercambiar información. Por ejemplo: que el sistema de ventas de una
    tienda le avise automáticamente al sistema de stock cuando se vende un producto, sin que una
    persona tenga que copiar los datos a mano de un sistema a otro.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es la integración de sistemas?', url: 'https://www.redhat.com/es/topics/integration/what-is-application-integration' }
  },
  {
    id: 'n2',
    title: 'API: la puerta de entrada entre sistemas',
    body: `Una API (Application Programming Interface / Interfaz de Programación de Aplicaciones) es
    como un mostrador de atención: un sistema pide algo (por ejemplo, "dame los datos del cliente 123")
    y otro sistema responde con esa información, siguiendo reglas claras y acordadas de antemano.`,
    resource: { type: 'video', label: 'Video: APIs explicadas fácil', url: 'https://www.youtube.com/watch?v=s7wmiS2mSXY' }
  },
  {
    id: 'n3',
    title: 'Front-end y back-end',
    body: `El front-end es lo que ve y toca el usuario: botones, pantallas, formularios. El back-end es
    la parte que no se ve, que procesa la información, guarda datos y aplica las reglas del negocio.
    Front-end y back-end se comunican casi siempre a través de una API.`,
    resource: { type: 'article', label: 'Artículo: diferencias entre front-end y back-end', url: 'https://developer.mozilla.org/es/docs/Learn/Front-end_web_developer' }
  },
  {
    id: 'n4',
    title: '¿Qué es una PWA?',
    body: `Una PWA (Progressive Web App / Aplicación Web Progresiva) es una página web que se puede
    "instalar" en el celular o la computadora como si fuera una app normal, y que puede funcionar
    parcialmente sin conexión a internet, gracias a que guarda una copia de sus archivos.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es una PWA?', url: 'https://web.dev/explore/progressive-web-apps' }
  },
  {
    id: 'n5',
    title: 'Formatos de intercambio: JSON y XML',
    body: `Para que dos sistemas se entiendan, necesitan hablar el mismo "idioma" de datos. Los más
    comunes son JSON (más simple y liviano) y XML (más antiguo, más detallado). Ambos organizan la
    información en una estructura ordenada que cualquier sistema puede leer.`,
    resource: { type: 'article', label: 'Artículo: JSON vs XML', url: 'https://www.w3schools.com/js/js_json_xml.asp' }
  },
  {
    id: 'n6',
    title: 'Middleware: el traductor entre sistemas',
    body: `A veces dos sistemas no pueden hablar directamente porque usan formatos o reglas distintas.
    Ahí aparece el middleware: un programa intermedio que traduce y ordena la comunicación entre ellos,
    como un intérprete entre dos personas que hablan idiomas distintos.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es un middleware?', url: 'https://www.ibm.com/es-es/topics/middleware' }
  },
  {
    id: 'n7',
    title: 'Servicios web y REST',
    body: `Un servicio web es una forma de ofrecer funciones de un sistema a través de internet, para
    que otros sistemas las usen. REST (Representational State Transfer) es un estilo muy popular para
    construir estos servicios, basado en reglas simples sobre cómo pedir y enviar información.`,
    resource: { type: 'video', label: 'Video: REST API explicada', url: 'https://www.youtube.com/watch?v=lsMQRaeKNDk' }
  },
  {
    id: 'n8',
    title: 'Seguridad básica al integrar sistemas',
    body: `Cuando dos sistemas se conectan, hay que cuidar que solo puedan acceder quienes tienen
    permiso. Para eso se usan claves de acceso, tokens (códigos temporales) y conexiones cifradas
    (HTTPS), que protegen la información mientras viaja de un sistema a otro.`,
    resource: { type: 'article', label: 'Artículo: seguridad en APIs', url: 'https://owasp.org/www-project-api-security/' }
  }
];

const MISCONCEPTIONS = [
  { id: 'm1', title: '"Integrar" no es copiar y pegar', text: 'Pensar que "integrar sistemas" es lo mismo que copiar y pegar datos a mano entre programas. En realidad, la integración busca automatizar ese intercambio.' },
  { id: 'm2', title: 'Una API no es un programa completo', text: 'Creer que una API es un programa completo. En realidad es solo la "puerta" que permite pedir o enviar información a un sistema.' },
  { id: 'm3', title: 'El front-end no es "toda la app"', text: 'Confundir front-end con "toda la app". El front-end es solo la parte visual; el back-end también es parte fundamental de la app.' },
  { id: 'm4', title: 'Una PWA no es igual a una app nativa', text: 'Pensar que una PWA es exactamente igual a una app nativa de las tiendas de aplicaciones. Se parece mucho, pero técnicamente sigue siendo una página web.' },
  { id: 'm5', title: 'JSON y XML no son lenguajes de programación', text: 'Creer que JSON y XML son lenguajes de programación. En realidad son solo formatos para organizar datos, no para escribir lógica.' },
  { id: 'm6', title: 'Integrar no es solo un tema técnico', text: 'Pensar que integrar dos sistemas es solo un tema técnico. También hay que ponerse de acuerdo en reglas de negocio, permisos y responsabilidades entre los equipos.' }
];

const CASES = [
  {
    id: 'c1',
    title: 'La cafetería y la app de pedidos',
    scenario: `Una cafetería tiene una caja registradora vieja y ahora suma una app para pedidos por
    celular. Los pedidos de la app no aparecen en la pantalla de la cocina: el mozo tiene que anotarlos
    a mano cuando llegan. ¿Qué está faltando para que esto funcione mejor?`,
    answer: `Falta integrar la app de pedidos con el sistema de la cocina (o de la caja), para que los
    pedidos aparezcan automáticamente sin que alguien los transcriba a mano.`,
    tips: [
      'Preguntá primero: ¿qué información tiene que viajar de un sistema al otro? (el pedido, la mesa, el horario)',
      'Pedí que identifiquen quién sería el "front-end" y quién el "back-end" en este caso.',
      'Guiá la charla hacia los riesgos de no integrar: errores humanos, demoras, pedidos perdidos.'
    ]
  },
  {
    id: 'c2',
    title: 'El gimnasio y las reservas de clases',
    scenario: `Un gimnasio usa una app para que los socios reserven turnos de clases, pero la lista de
    socios activos está en otro sistema, el de pagos. A veces alguien que no pagó la cuota igual puede
    reservar clase. ¿Cómo se soluciona esto con integración de sistemas?`,
    answer: `El sistema de reservas debería consultar en tiempo real al sistema de pagos si el socio
    está al día, antes de confirmar la reserva. Eso se puede hacer con una API entre ambos sistemas.`,
    tips: [
      'Pedí a los alumnos que digan qué pregunta le haría un sistema al otro (ejemplo: "¿este socio está al día?").',
      'Charlen sobre qué pasa si el sistema de pagos está caído en ese momento.',
      'Relacionen esto con el concepto de API como intercambio de preguntas y respuestas entre sistemas.'
    ]
  },
  {
    id: 'c3',
    title: 'La librería con dos sistemas de stock',
    scenario: `Una librería vende en su local y también por una página web, pero cada canal tiene su
    propio conteo de stock por separado. Un día venden el mismo libro (el último que quedaba) por los
    dos canales al mismo tiempo. ¿Qué salió mal?`,
    answer: `Los dos sistemas de stock no están integrados: no comparten la información en tiempo real,
    por eso ninguno "sabe" lo que pasa en el otro canal.`,
    tips: [
      'Preguntá qué pasaría si hubiera un solo sistema de stock compartido por ambos canales.',
      'Hablen sobre la diferencia entre actualizar el stock "cada tanto" versus "al instante".',
      'Conecten esto con la idea de tener una única fuente de verdad para un mismo dato.'
    ]
  },
  {
    id: 'c4',
    title: 'El colectivo y la tarjeta de transporte',
    scenario: `Cuando pasás la tarjeta en el colectivo, en segundos el sistema sabe si tenés saldo, te
    cobra el pasaje y te avisa el saldo restante. ¿Qué sistemas creés que están hablando entre sí en
    ese momento?`,
    answer: `El lector de la tarjeta (front-end del colectivo) se comunica con un sistema central que
    guarda el saldo de cada tarjeta, valida el cobro y actualiza el saldo, todo en segundos.`,
    tips: [
      'Pedí que imaginen qué pasaría si esa comunicación tardara 10 segundos en vez de 1.',
      'Hablen sobre la importancia de la velocidad de respuesta en sistemas integrados.',
      'Relacionen con el concepto de "en tiempo real" versus procesos que se hacen más tarde.'
    ]
  },
  {
    id: 'c5',
    title: 'El consultorio médico y las recetas digitales',
    scenario: `Un médico carga una receta en su sistema, y esa receta debería aparecer automáticamente
    disponible en cualquier farmacia. Pero una farmacia dice que no la encuentra en su sistema. ¿Qué
    puede estar fallando?`,
    answer: `Puede que el sistema del consultorio y el sistema de la farmacia no estén correctamente
    integrados (por ejemplo, una API que no funciona bien, o formatos de datos distintos que no se
    entienden entre sí).`,
    tips: [
      'Pedí ejemplos de qué información mínima necesitaría viajar en una receta digital.',
      'Charlen sobre por qué es importante que los datos tengan siempre el mismo formato.',
      'Mencioná que en estos casos la seguridad de los datos (información médica) es clave.'
    ]
  },
  {
    id: 'c6',
    title: 'La app del clima que no carga sin internet',
    scenario: `Juan instaló una app del clima como PWA en su celular. Cuando tiene internet, ve el
    pronóstico actualizado. Cuando no tiene señal, la app abre igual y muestra el último pronóstico que
    había cargado, aunque esté un poco desactualizado. ¿Por qué pasa esto?`,
    answer: `Porque las PWA pueden guardar una copia (caché) de la información y de la app en el
    dispositivo, para poder abrir igual sin conexión, aunque los datos no se actualicen en ese momento.`,
    tips: [
      'Pedí que piensen en otras apps donde vieron este mismo comportamiento (sin conexión).',
      'Hablen sobre la diferencia entre "no tener datos" y "tener datos viejos".',
      'Conecten con el concepto de service worker como el que guarda esa copia local.'
    ]
  }
];

const GLOSSARY = [
  { term: 'API (Application Programming Interface / Interfaz de Programación de Aplicaciones)', def: 'Conjunto de reglas que permite que dos sistemas se pidan información o funciones entre sí.' },
  { term: 'PWA (Progressive Web App / Aplicación Web Progresiva)', def: 'Página web que se puede instalar como app y funcionar parcialmente sin conexión.' },
  { term: 'JSON (JavaScript Object Notation / Notación de Objetos de JavaScript)', def: 'Formato simple y liviano para organizar datos, muy usado para el intercambio entre sistemas.' },
  { term: 'XML (Extensible Markup Language / Lenguaje de Marcado Extensible)', def: 'Formato para organizar datos usando etiquetas, más detallado que JSON.' },
  { term: 'REST (Representational State Transfer / Transferencia de Estado Representacional)', def: 'Estilo de diseño para construir servicios web simples, basado en reglas claras.' },
  { term: 'HTTP (HyperText Transfer Protocol / Protocolo de Transferencia de Hipertexto)', def: 'Reglas que usan los sistemas para comunicarse a través de internet.' },
  { term: 'HTTPS (HyperText Transfer Protocol Secure / Protocolo de Transferencia de Hipertexto Seguro)', def: 'Versión segura y cifrada del HTTP, que protege los datos mientras viajan.' },
  { term: 'SDK (Software Development Kit / Kit de Desarrollo de Software)', def: 'Conjunto de herramientas listas para usar que ayudan a crear programas más rápido.' },
  { term: 'UI (User Interface / Interfaz de Usuario)', def: 'La parte visual con la que interactúa la persona: botones, pantallas, menús.' },
  { term: 'UX (User Experience / Experiencia de Usuario)', def: 'Qué tan fácil, agradable y clara le resulta a la persona usar un sistema o app.' },
  { term: 'CRUD (Create, Read, Update, Delete / Crear, Leer, Actualizar, Eliminar)', def: 'Las cuatro operaciones básicas que se hacen sobre los datos de un sistema.' },
  { term: 'SQL (Structured Query Language / Lenguaje de Consulta Estructurado)', def: 'Lenguaje usado para pedir, guardar o modificar datos en una base de datos.' },
  { term: 'ERP (Enterprise Resource Planning / Planificación de Recursos Empresariales)', def: 'Sistema que integra distintas áreas de una empresa (ventas, stock, finanzas) en un solo lugar.' },
  { term: 'CRM (Customer Relationship Management / Gestión de la Relación con el Cliente)', def: 'Sistema para organizar y seguir la relación de una empresa con sus clientes.' },
  { term: 'IoT (Internet of Things / Internet de las Cosas)', def: 'Dispositivos cotidianos (heladeras, luces, sensores) conectados a internet e integrados entre sí.' },
  { term: 'B2B (Business to Business / Negocio a Negocio)', def: 'Integración o intercambio de información entre sistemas de dos empresas distintas.' },
  { term: 'EDI (Electronic Data Interchange / Intercambio Electrónico de Datos)', def: 'Forma estandarizada y antigua de intercambiar documentos comerciales entre sistemas.' },
  { term: 'SaaS (Software as a Service / Software como Servicio)', def: 'Programa que se usa desde internet, sin instalarlo, pagando normalmente una suscripción.' },
  { term: 'Token (Ficha / Credencial temporal)', def: 'Código temporal que identifica y autoriza a un sistema o usuario a acceder a otro sistema.' },
  { term: 'Endpoint (Punto de acceso)', def: 'Dirección específica de una API a la que un sistema le hace un pedido concreto.' },
  { term: 'Middleware (Programa intermedio)', def: 'Software que conecta y traduce la comunicación entre dos sistemas distintos.' },
  { term: 'Webhook (Aviso automático por web)', def: 'Aviso automático que un sistema le manda a otro apenas ocurre un evento, sin que nadie pregunte.' }
];

const QUESTIONS = [
  { q: '¿Qué es una API?', options: ['Un tipo de base de datos', 'Una interfaz que permite que dos sistemas se comuniquen', 'Un lenguaje de programación', 'Un antivirus'], correct: 1 },
  { q: '¿Qué significa PWA?', options: ['Programa Web Automático', 'Aplicación Web Progresiva', 'Protocolo Web Avanzado', 'Página Web Adaptable'], correct: 1 },
  { q: '¿Cuál es la principal diferencia entre front-end y back-end?', options: ['El front-end es la parte visual, el back-end procesa datos', 'Son exactamente lo mismo', 'El back-end es solo para celulares', 'El front-end nunca se conecta a una API'], correct: 0 },
  { q: '¿Para qué sirve el formato JSON?', options: ['Para diseñar pantallas', 'Para organizar e intercambiar datos entre sistemas', 'Para proteger contraseñas', 'Para acelerar internet'], correct: 1 },
  { q: '¿Qué hace un middleware?', options: ['Diseña la interfaz visual', 'Traduce y conecta la comunicación entre sistemas distintos', 'Guarda copias de seguridad', 'Vende licencias de software'], correct: 1 },
  { q: '¿Qué característica tiene una PWA que no tiene una web común?', options: ['Se puede instalar y funcionar parcialmente sin conexión', 'No necesita diseño', 'Solo funciona en una marca de celular', 'No usa HTML'], correct: 0 },
  { q: '¿Qué es REST?', options: ['Un lenguaje de bases de datos', 'Un estilo para construir servicios web', 'Un tipo de antivirus', 'Un navegador'], correct: 1 },
  { q: '¿Qué significa HTTPS respecto de HTTP?', options: ['Es una versión más antigua', 'Es la versión segura y cifrada', 'No tiene relación', 'Es solo para videos'], correct: 1 },
  { q: '¿Qué es un token en el contexto de integración de sistemas?', options: ['Un tipo de gráfico', 'Un código temporal que autoriza el acceso a un sistema', 'Un error del sistema', 'Un formato de imagen'], correct: 1 },
  { q: '¿Qué es un endpoint?', options: ['El final de un cable de red', 'Una dirección específica de una API para hacer un pedido', 'Un tipo de base de datos', 'Un dispositivo IoT'], correct: 1 }
];
