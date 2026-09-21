// Contenido de la app: Integración de Sistemas
// Para agregar preguntas nuevas sin tocar el resto del código, usá generador.html

const NOTES = [
  {
    id: 'n1',
    title: '¿Qué es la Integración de Sistemas?',
    body: `Integrar sistemas significa hacer que distintos programas, que fueron pensados por separado,
    puedan trabajar juntos e intercambiar información. Por ejemplo: que el sistema de ventas de una
    tienda le avise automáticamente al sistema de stock cuando se vende un producto, sin que una
    persona tenga que copiar los datos a mano de un sistema a otro.

    Esto pasa todo el tiempo en las empresas: casi ninguna usa un solo programa gigante que hace todo.
    Usan varios sistemas más chicos, cada uno especializado en algo (ventas, contabilidad, recursos
    humanos, atención al cliente), y esos sistemas necesitan "hablarse" entre sí para que la información
    esté siempre actualizada en todos lados.

    Cuando los sistemas NO están integrados, aparecen problemas típicos: hay que cargar el mismo dato
    dos o tres veces en lugares distintos, se cometen errores al tipear a mano, y la información queda
    desactualizada porque nadie se acuerda de avisarle al otro sistema. Integrar bien evita todo eso:
    ahorra tiempo, reduce errores y hace que las decisiones se tomen con datos actualizados.

    Hay distintos niveles de integración: puede ser tan simple como que un sistema le mande un archivo
    al otro una vez por día, o tan avanzado como que se comuniquen en tiempo real cada vez que pasa
    algo importante (una venta, un pago, un envío).`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es la integración de sistemas?', url: 'https://www.redhat.com/es/topics/integration/what-is-application-integration' }
  },
  {
    id: 'n2',
    title: 'API: la puerta de entrada entre sistemas',
    body: `Una API (Application Programming Interface / Interfaz de Programación de Aplicaciones) es
    como un mostrador de atención: un sistema pide algo (por ejemplo, "dame los datos del cliente 123")
    y otro sistema responde con esa información, siguiendo reglas claras y acordadas de antemano.

    Pensalo como el menú de un restaurante: el menú te dice exactamente qué platos podés pedir, cómo
    pedirlos y qué vas a recibir a cambio. No podés entrar a la cocina y buscar lo que quieras: le pedís
    al mozo (la API) algo que está en el menú, y él te lo trae. La API funciona igual: define qué
    pedidos son válidos y qué respuesta vas a obtener por cada uno.

    Una API puede ofrecer distintas acciones: consultar datos ("dame la lista de productos"), crear
    algo nuevo ("registrá este pedido"), modificar información ("actualizá el stock") o eliminar algo
    ("cancelá esta reserva). Cada una de esas acciones suele tener su propia "dirección" dentro de la
    API, llamada endpoint.

    Las APIs son la base de casi toda la tecnología moderna: cuando una app de delivery te muestra el
    mapa con tu pedido en camino, en realidad le está preguntando constantemente a la API de un servicio
    de mapas "¿dónde está este vehículo ahora?". Sin APIs, cada empresa tendría que programar todo desde
    cero, sin poder aprovechar servicios que ya existen.`,
    resource: { type: 'video', label: 'Video: APIs explicadas fácil', url: 'https://www.youtube.com/watch?v=s7wmiS2mSXY' }
  },
  {
    id: 'n3',
    title: 'Front-end y back-end',
    body: `El front-end es lo que ve y toca el usuario: botones, pantallas, formularios. El back-end es
    la parte que no se ve, que procesa la información, guarda datos y aplica las reglas del negocio.
    Front-end y back-end se comunican casi siempre a través de una API.

    Un buen ejemplo es un cajero automático. El front-end es la pantalla táctil, los botones y la
    ranura donde metés la tarjeta: todo lo que vos tocás y ves. El back-end es el sistema del banco que,
    detrás de escena, revisa si tenés saldo, descuenta el dinero y registra la operación. Vos nunca ves
    esa parte, pero es la que realmente hace el trabajo importante.

    Esta separación tiene una ventaja grande: el mismo back-end puede atender a varios front-ends
    distintos al mismo tiempo. Por ejemplo, un banco puede tener una app de celular, una página web y
    los cajeros automáticos, y los tres "front-ends" distintos se conectan al mismo back-end para hacer
    las mismas operaciones.

    Por eso, cuando algo "no funciona" en una app, puede fallar en cualquiera de los dos lados: puede
    ser un problema visual del front-end (un botón que no responde) o un problema del back-end (el
    sistema que procesa el pedido está caído). Distinguir estas dos partes ayuda mucho a la hora de
    diagnosticar un error.`,
    resource: { type: 'article', label: 'Artículo: diferencias entre front-end y back-end', url: 'https://developer.mozilla.org/es/docs/Learn/Front-end_web_developer' }
  },
  {
    id: 'n4',
    title: '¿Qué es una PWA?',
    body: `Una PWA (Progressive Web App / Aplicación Web Progresiva) es una página web que se puede
    "instalar" en el celular o la computadora como si fuera una app normal, y que puede funcionar
    parcialmente sin conexión a internet, gracias a que guarda una copia de sus archivos.

    La diferencia con una página web común es que una PWA se "porta" como una app: le aparece un ícono
    en la pantalla de inicio, se abre en su propia ventana (sin la barra del navegador), y puede seguir
    funcionando aunque el celular se quede sin señal por un rato, mostrando la última información que
    había guardado.

    Esto se logra con una pieza especial llamada service worker: es un programa que corre "de fondo" en
    el navegador y que intercepta los pedidos de la app a internet. Cuando hay conexión, guarda una
    copia de los archivos importantes; cuando no hay conexión, usa esa copia guardada en vez de fallar.

    Las PWA se volvieron populares porque combinan lo mejor de dos mundos: no hay que subirlas a una
    tienda de aplicaciones (como Google Play o App Store) para que la gente las use, pero igual se
    sienten como una app instalada. Esta misma app de estudio de Integración de Sistemas es una PWA:
    por eso te aparece la opción de instalarla en tu celular.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es una PWA?', url: 'https://web.dev/explore/progressive-web-apps' }
  },
  {
    id: 'n9',
    title: 'Aplicaciones nativas',
    body: `Una aplicación nativa es un programa hecho específicamente para un sistema operativo (Android
    o iOS), usando las herramientas y el lenguaje que ese sistema operativo espera. Se descarga e
    instala desde una tienda de aplicaciones, como Google Play o App Store.

    La palabra "nativa" quiere decir que la app "nació" para ese sistema en particular: una app nativa de
    Android está escrita pensando solo en Android (por ejemplo, con el lenguaje Kotlin), y una app nativa
    de iOS está escrita pensando solo en iPhone (por ejemplo, con el lenguaje Swift). Por eso, si una
    empresa quiere estar en los dos sistemas, en general tiene que programar dos apps distintas, una para
    cada uno.

    La gran ventaja de una app nativa es que puede aprovechar al máximo todo lo que ofrece el celular:
    la cámara, el GPS, las notificaciones, los sensores, el micrófono, todo con el mejor rendimiento
    posible, porque está hecha a medida para ese sistema operativo. Por eso, las apps que necesitan
    mucha velocidad o usar mucho el hardware del celular (como juegos exigentes o apps de edición de
    video) suelen ser nativas.

    La desventaja es el costo: hay que armar y mantener dos versiones distintas de la misma app (una para
    Android y otra para iOS), lo que implica más tiempo de trabajo y más gente dedicada al proyecto,
    comparado con otras formas de desarrollar apps.`,
    resource: { type: 'article', label: 'Artículo: apps nativas explicadas', url: 'https://www.ibm.com/es-es/topics/native-apps' }
  },
  {
    id: 'n10',
    title: 'Aplicaciones híbridas',
    body: `Una aplicación híbrida es un punto intermedio entre una página web y una app nativa: se
    programa una sola vez usando tecnologías web (HTML, CSS y JavaScript, las mismas que arman páginas
    web), y después se "envuelve" con una herramienta especial para que se pueda instalar como una app
    normal, tanto en Android como en iOS.

    La palabra "híbrida" viene justamente de esa mezcla: por dentro funciona parecido a una página web,
    pero por fuera se ve y se instala como una app nativa, con su ícono, su ventana propia y presencia en
    las tiendas de aplicaciones. Algunas herramientas conocidas para armar apps híbridas son Cordova,
    Ionic o React Native (aunque este último se acerca bastante a lo nativo en varios aspectos).

    La gran ventaja de una app híbrida es que se escribe el código una sola vez y funciona en varios
    sistemas operativos, lo que ahorra mucho tiempo y trabajo en comparación con hacer dos apps nativas
    separadas. Esto la hace una opción atractiva para empresas chicas o para proyectos que necesitan
    salir rápido a varias plataformas a la vez.

    La desventaja es que, al no estar hecha 100% a medida de cada sistema operativo, puede rendir un poco
    peor que una app nativa en tareas muy exigentes, y a veces tarda más en tener acceso a las funciones
    más nuevas que sacan Android o iOS, porque depende de que la herramienta intermedia las incorpore
    primero.

    Comparándola con lo que ya vimos de PWA: una app híbrida se distribuye por las tiendas de
    aplicaciones como cualquier app nativa, mientras que una PWA se instala directamente desde el
    navegador, sin pasar por ninguna tienda.`,
    resource: { type: 'article', label: 'Artículo: apps híbridas explicadas', url: 'https://www.ibm.com/es-es/topics/hybrid-app' }
  },
  {
    id: 'n5',
    title: 'Formatos de intercambio: JSON y XML',
    body: `Para que dos sistemas se entiendan, necesitan hablar el mismo "idioma" de datos. Los más
    comunes son JSON (más simple y liviano) y XML (más antiguo, más detallado). Ambos organizan la
    información en una estructura ordenada que cualquier sistema puede leer.

    JSON organiza los datos en pares de "nombre" y "valor", parecido a una ficha: por ejemplo,
    "nombre": "Ana", "edad": 28. Es liviano, fácil de leer para una persona y muy usado en las APIs
    modernas, sobre todo en aplicaciones web y celulares.

    XML organiza la información con etiquetas, de forma parecida al HTML de una página web, por ejemplo
    <cliente><nombre>Ana</nombre><edad>28</edad></cliente>. Es más largo de escribir que JSON, pero
    permite describir reglas más detalladas sobre cómo tiene que ser esa información, algo que todavía
    se usa mucho en sistemas más antiguos o corporativos.

    Lo importante no es memorizar la sintaxis exacta, sino entender la idea de fondo: sin un formato
    compartido, cada sistema podría organizar sus datos como quisiera, y sería imposible que se
    entiendan entre sí. El formato es como el "alfabeto" común que hace posible la integración.`,
    resource: { type: 'article', label: 'Artículo: JSON vs XML', url: 'https://www.w3schools.com/js/js_json_xml.asp' }
  },
  {
    id: 'n6',
    title: 'Middleware: el traductor entre sistemas',
    body: `A veces dos sistemas no pueden hablar directamente porque usan formatos o reglas distintas.
    Ahí aparece el middleware: un programa intermedio que traduce y ordena la comunicación entre ellos,
    como un intérprete entre dos personas que hablan idiomas distintos.

    Un caso típico: una empresa tiene un sistema viejo (de hace 15 años) que solo entiende XML, y quiere
    conectarlo con una app nueva que solo trabaja con JSON. En vez de reescribir el sistema viejo desde
    cero (algo caro y arriesgado), se pone un middleware en el medio que recibe los datos en un formato,
    los traduce, y se los entrega al otro sistema en el formato que necesita.

    El middleware no solo traduce formatos: también puede ordenar la comunicación cuando hay muchos
    sistemas conectados entre sí. En vez de que cada sistema tenga que saber cómo hablarle a todos los
    demás (lo que sería un enredo enorme), todos hablan con el middleware, y el middleware se encarga de
    llevar cada mensaje a donde tiene que ir.

    Esto también ayuda a que, si mañana cambia un sistema, no haya que modificar todos los demás: alcanza
    con actualizar la "traducción" en el middleware, y el resto sigue funcionando igual.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es un middleware?', url: 'https://www.ibm.com/es-es/topics/middleware' }
  },
  {
    id: 'n11',
    title: 'Arquitecturas de integración: SOA, ESB y microservicios',
    body: `Además de conectar sistemas de a dos con un middleware simple, existen formas más grandes de
    organizar toda la integración de una empresa. Tres de las más nombradas son SOA, ESB y
    microservicios: se parecen entre sí, pero no son lo mismo.

    SOA (Service-Oriented Architecture / Arquitectura Orientada a Servicios) es una idea general: en vez
    de armar un sistema como un bloque gigante, se lo separa en "servicios" independientes, cada uno con
    una función clara (por ejemplo, un servicio de facturación, otro de stock, otro de clientes). Esos
    servicios se combinan entre sí para armar procesos más grandes, como "generar una venta completa".

    El ESB (Enterprise Service Bus / Bus de Servicios Empresariales) es una forma concreta de poner en
    práctica esa idea: es un tipo especial de middleware que actúa como un "canal central" único. En vez
    de que cada servicio tenga que conectarse directamente con todos los demás (lo que se vuelve un
    enredo cuando hay muchos), todos los servicios se conectan al ESB, y el ESB se encarga de llevar cada
    mensaje a donde tiene que ir, traduciendo formatos si hace falta.

    Los microservicios son una evolución más moderna de esta misma idea: en vez de tener servicios
    grandes conectados por un bus central, se arman muchísimos servicios bien chiquitos, cada uno
    encargado de una sola tarea muy específica, que se pueden actualizar o hacer crecer por separado sin
    afectar a los demás. Es como pasar de tener pocos empleados con muchas responsabilidades cada uno, a
    tener muchos empleados, cada uno experto en una sola cosa.

    En la práctica, muchas empresas grandes usan una combinación de estas ideas: parte de su sistema
    viejo puede seguir organizado con SOA y un ESB, mientras van armando partes nuevas con
    microservicios, migrando de a poco en vez de cambiar todo de golpe.`,
    resource: { type: 'article', label: 'Artículo: SOA, ESB y microservicios', url: 'https://www.redhat.com/es/topics/soa/what-is-soa' }
  },
  {
    id: 'n12',
    title: 'Comunicación sincrónica y asincrónica',
    body: `Cuando dos sistemas se comunican, pueden hacerlo de dos maneras muy distintas: esperando la
    respuesta antes de seguir (sincrónica), o siguiendo con otras cosas mientras la respuesta llega más
    tarde (asincrónica). Elegir bien entre una y otra es una decisión importante al integrar sistemas.

    La comunicación sincrónica es como una llamada telefónica: llamás, y te quedás esperando en la línea
    hasta que la otra persona te responde, sin poder hacer otra cosa mientras tanto. En sistemas, esto
    pasa por ejemplo cuando una app le pide a una API "decime si hay stock" y se queda "congelada"
    esperando la respuesta antes de mostrarte algo en pantalla.

    La comunicación asincrónica es más parecida a mandar un mensaje de texto: lo enviás y seguís con tu
    vida, sin quedarte esperando pegado a la pantalla; cuando te responden, te enterás y seguís desde
    ahí. En sistemas, esto se usa mucho para tareas que tardan (por ejemplo, generar un reporte grande o
    procesar un pago): el sistema arranca la tarea, sigue haciendo otras cosas, y avisa cuando termina
    (muchas veces con un webhook).

    Ninguna de las dos es "mejor" en general: depende de la situación. Si necesitás la respuesta sí o sí
    para poder continuar (como saber si hay stock antes de confirmar una compra), conviene sincrónica. Si
    la tarea puede tardar y el usuario puede seguir haciendo otra cosa mientras tanto, conviene
    asincrónica, porque no deja todo "trabado" esperando.`,
    resource: { type: 'article', label: 'Artículo: sincrónico vs. asincrónico', url: 'https://aws.amazon.com/es/compare/the-difference-between-synchronous-and-asynchronous-communication/' }
  },
  {
    id: 'n7',
    title: 'Servicios web y REST',
    body: `Un servicio web es una forma de ofrecer funciones de un sistema a través de internet, para
    que otros sistemas las usen. REST (Representational State Transfer) es un estilo muy popular para
    construir estos servicios, basado en reglas simples sobre cómo pedir y enviar información.

    La idea central de REST es tratar todo como un "recurso": un cliente, un producto, un pedido. Cada
    recurso tiene su propia dirección (por ejemplo, algo así como /clientes/123), y para trabajar con él
    se usan verbos simples y estandarizados: pedir información (consultar), crear uno nuevo, actualizarlo
    o eliminarlo.

    Una gran ventaja de REST es que es "sin estado": cada pedido que se hace incluye toda la información
    necesaria para entenderlo, sin que el servidor tenga que "recordar" pedidos anteriores. Esto hace que
    los servicios REST sean más simples de mantener y más fáciles de hacer crecer cuando muchos sistemas
    los usan al mismo tiempo.

    Hoy en día, la gran mayoría de las apps que usás a diario (redes sociales, bancos, servicios de
    streaming) se comunican con sus servidores usando servicios web de estilo REST, aunque vos nunca lo
    veas directamente.`,
    resource: { type: 'video', label: 'Video: REST API explicada', url: 'https://www.youtube.com/watch?v=lsMQRaeKNDk' }
  },
  {
    id: 'n8',
    title: 'Seguridad básica al integrar sistemas',
    body: `Cuando dos sistemas se conectan, hay que cuidar que solo puedan acceder quienes tienen
    permiso. Para eso se usan claves de acceso, tokens (códigos temporales) y conexiones cifradas
    (HTTPS), que protegen la información mientras viaja de un sistema a otro.

    Una clave de acceso funciona como una contraseña que un sistema le muestra a otro para demostrar
    "soy quien digo ser, dejame entrar". Un token es parecido, pero con una diferencia importante: tiene
    fecha de vencimiento. Así, si alguien lo roba, deja de servir después de un tiempo, en vez de quedar
    válido para siempre.

    HTTPS es la versión segura del protocolo que usan los navegadores para viajar por internet: cifra la
    información en el camino, para que si alguien la intercepta, no pueda leerla. Por eso siempre hay
    que fijarse que las direcciones web usadas para intercambiar datos empiecen con "https://" y no con
    "http://" a secas.

    La seguridad no es un detalle menor al integrar sistemas: cuantos más sistemas se conectan entre sí,
    más "puertas" hay que cuidar. Una sola conexión mal protegida puede ser la puerta de entrada para que
    alguien acceda a información que no debería ver, aunque el resto de los sistemas esté bien
    protegido.`,
    resource: { type: 'article', label: 'Artículo: seguridad en APIs', url: 'https://owasp.org/www-project-api-security/' }
  },
  {
    id: 'n13',
    title: 'OAuth y API Gateway: control de acceso avanzado',
    body: `Además de las claves y los tokens básicos, hay herramientas más avanzadas para manejar quién
    puede acceder a qué, sobre todo cuando muchos sistemas y muchas APIs se conectan entre sí. Dos de las
    más usadas son OAuth y el API Gateway.

    OAuth (Open Authorization / Autorización Abierta) es un estándar que le permite a una app acceder a
    datos de otra sin necesidad de que le des tu contraseña. Seguramente ya lo usaste sin darte cuenta:
    cuando una página te ofrece "Iniciar sesión con Google" o "Iniciar sesión con Facebook", por atrás
    está funcionando OAuth. Vos le das permiso a esa página para usar ciertos datos de tu cuenta de
    Google (como tu nombre y tu email), pero la página nunca ve ni guarda tu contraseña de Google.

    Esto es importante porque, sin OAuth, cada app nueva te pediría crear una contraseña distinta, y en
    algún momento alguna de esas apps podría manejar mal esa contraseña. Con OAuth, la contraseña se la
    das una sola vez al servicio de confianza (Google, Facebook, etc.), y el resto de las apps solo
    reciben un permiso limitado, que además se puede revocar en cualquier momento.

    El API Gateway (Puerta de enlace de API), por su parte, es un punto único por donde pasan todos los
    pedidos hacia las APIs de una empresa, antes de llegar a los sistemas reales. Funciona como un
    portero: revisa que cada pedido tenga los permisos correctos, controla que nadie mande demasiados
    pedidos de golpe (para evitar sobrecargas), y a veces hasta traduce el pedido antes de mandarlo al
    sistema correspondiente.

    La ventaja de tener un API Gateway es que esas tareas de seguridad y control se resuelven en un solo
    lugar, en vez de tener que repetir la misma lógica en cada API por separado. Esto hace que agregar
    una API nueva sea mucho más simple: solo hay que conectarla al Gateway, que ya sabe cómo manejar la
    seguridad para todas.`,
    resource: { type: 'article', label: 'Artículo: ¿Qué es OAuth?', url: 'https://www.ibm.com/es-es/topics/oauth' }
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
  { term: 'ESB (Enterprise Service Bus / Bus de Servicios Empresariales)', def: 'Tipo de middleware que funciona como un "canal central" por el que pasan todos los mensajes entre los sistemas de una empresa, en vez de que cada sistema se conecte directamente con todos los demás.' },
  { term: 'SOA (Service-Oriented Architecture / Arquitectura Orientada a Servicios)', def: 'Forma de organizar un sistema grande como un conjunto de servicios más chicos e independientes, que se comunican entre sí para realizar tareas completas.' },
  { term: 'SOAP (Simple Object Access Protocol / Protocolo Simple de Acceso a Objetos)', def: 'Estilo más antiguo y estricto que REST para construir servicios web, que siempre usa XML y reglas muy formales.' },
  { term: 'Microservicios (Microservices)', def: 'Forma de armar un sistema grande dividiéndolo en muchos servicios pequeños e independientes, cada uno encargado de una sola tarea.' },
  { term: 'Sistema legado (Legacy system)', def: 'Sistema viejo, muchas veces difícil de reemplazar, que sigue en uso y que hay que integrar con los sistemas nuevos.' },
  { term: 'Comunicación sincrónica (Synchronous communication)', def: 'Cuando un sistema le pide algo a otro y se queda esperando la respuesta antes de seguir con lo siguiente.' },
  { term: 'Comunicación asincrónica (Asynchronous communication)', def: 'Cuando un sistema envía un pedido y sigue trabajando sin esperar la respuesta inmediata; la respuesta llega más tarde.' },
  { term: 'OAuth (Open Authorization / Autorización Abierta)', def: 'Forma estándar de darle permiso a una app para acceder a datos de otra, sin tener que compartir la contraseña.' },
  { term: 'API Gateway (Puerta de enlace de API)', def: 'Punto único por donde pasan todos los pedidos a las APIs de una empresa, que controla la seguridad, los límites de uso y organiza el tráfico.' },
  { term: 'Webhook (Aviso automático por web)', def: 'Aviso automático que un sistema le manda a otro apenas ocurre un evento, sin que nadie pregunte.' },
  { term: 'Aplicación nativa (Native app)', def: 'App hecha específicamente para un sistema operativo (Android o iOS), con su propio lenguaje y máximo aprovechamiento del hardware.' },
  { term: 'Aplicación híbrida (Hybrid app)', def: 'App hecha una sola vez con tecnologías web y empaquetada para instalarse en Android y iOS como si fuera nativa.' }
];

const QUESTIONS = [
  { q: '¿Qué significa "integrar sistemas"?', options: ['Instalar un antivirus en todos los sistemas', 'Hacer que programas distintos trabajen juntos e intercambien información', 'Borrar los sistemas viejos y usar uno solo', 'Traducir un programa a otro idioma'], correct: 1 },
  { q: '¿Qué es una API?', options: ['Un tipo de base de datos', 'Una interfaz que permite que dos sistemas se comuniquen', 'Un lenguaje de programación', 'Un antivirus'], correct: 1 },
  { q: '¿Cuál es la principal diferencia entre front-end y back-end?', options: ['El front-end es la parte visual, el back-end procesa datos', 'Son exactamente lo mismo', 'El back-end es solo para celulares', 'El front-end nunca se conecta a una API'], correct: 0 },
  { q: '¿Qué significa PWA?', options: ['Programa Web Automático', 'Aplicación Web Progresiva', 'Protocolo Web Avanzado', 'Página Web Adaptable'], correct: 1 },
  { q: '¿Qué característica tiene una PWA que no tiene una web común?', options: ['Se puede instalar y funcionar parcialmente sin conexión', 'No necesita diseño', 'Solo funciona en una marca de celular', 'No usa HTML'], correct: 0 },
  { q: '¿Qué es una aplicación nativa?', options: ['Una página web sin estilos', 'Una app hecha específicamente para un sistema operativo (Android o iOS)', 'Un tipo de base de datos', 'Una app que solo funciona sin internet'], correct: 1 },
  { q: '¿Cuál es la principal ventaja de una aplicación híbrida frente a hacer dos apps nativas?', options: ['Se escribe una sola vez y funciona en varios sistemas operativos', 'Siempre es más rápida que una app nativa', 'No necesita conexión a internet nunca', 'No se puede publicar en las tiendas de aplicaciones'], correct: 0 },
  { q: '¿Para qué sirve el formato JSON?', options: ['Para diseñar pantallas', 'Para organizar e intercambiar datos entre sistemas', 'Para proteger contraseñas', 'Para acelerar internet'], correct: 1 },
  { q: '¿Qué hace un middleware?', options: ['Diseña la interfaz visual', 'Traduce y conecta la comunicación entre sistemas distintos', 'Guarda copias de seguridad', 'Vende licencias de software'], correct: 1 },
  { q: '¿Qué es un ESB (Enterprise Service Bus)?', options: ['Un tipo de base de datos', 'Un tipo de middleware que funciona como canal central entre muchos sistemas', 'Un lenguaje de programación', 'Un navegador web'], correct: 1 },
  { q: '¿Cuál es la idea principal de los microservicios?', options: ['Usar un solo programa gigante para todo', 'Dividir un sistema grande en muchos servicios chicos e independientes', 'Eliminar la necesidad de bases de datos', 'Reemplazar todas las APIs por archivos XML'], correct: 1 },
  { q: '¿Qué es la comunicación asincrónica entre sistemas?', options: ['Cuando un sistema espera la respuesta antes de seguir', 'Cuando un sistema sigue trabajando sin esperar la respuesta inmediata', 'Cuando dos sistemas nunca se comunican', 'Cuando la comunicación solo funciona sin internet'], correct: 1 },
  { q: '¿Qué es REST?', options: ['Un lenguaje de bases de datos', 'Un estilo para construir servicios web', 'Un tipo de antivirus', 'Un navegador'], correct: 1 },
  { q: '¿Qué significa HTTPS respecto de HTTP?', options: ['Es una versión más antigua', 'Es la versión segura y cifrada', 'No tiene relación', 'Es solo para videos'], correct: 1 },
  { q: '¿Qué es un token en el contexto de integración de sistemas?', options: ['Un tipo de gráfico', 'Un código temporal que autoriza el acceso a un sistema', 'Un error del sistema', 'Un formato de imagen'], correct: 1 },
  { q: '¿Para qué sirve OAuth?', options: ['Para darle permiso a una app de acceder a datos de otra sin compartir la contraseña', 'Para acelerar la conexión a internet', 'Para traducir datos de JSON a XML', 'Para diseñar la interfaz visual de una app'], correct: 0 },
  { q: '¿Qué función cumple un API Gateway?', options: ['Es el único punto por donde pasan los pedidos a las APIs, controlando seguridad y tráfico', 'Es un tipo de base de datos para guardar contraseñas', 'Es una app que reemplaza al front-end', 'Es un formato de intercambio de datos como JSON'], correct: 0 }
];
