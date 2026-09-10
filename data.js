// ---------------------------------------------------------------------------
// Contenido de la app — Integración de Sistemas
// Todo vive en el cliente (sin backend). Editá estos arreglos para
// actualizar el contenido. Escrito en lenguaje simple, para que se entienda
// sin necesidad de conocimientos previos.
// ---------------------------------------------------------------------------

const NOTES = [
  {
    id: 'n1',
    title: '¿Qué es la integración de sistemas?',
    body: 'Es conectar programas o sistemas distintos para que trabajen juntos, como si fueran uno solo. Así comparten información entre ellos y ninguno queda funcionando solo, como una isla separada del resto.',
    resource: { type: 'article', label: 'Artículo: Qué es la integración de sistemas informáticos', url: 'https://www.aurum-informatica.es/blog/que-es-la-integracion-de-sistemas-informaticos' },
  },
  {
    id: 'n2',
    title: 'Acoplamiento fuerte vs. débil',
    body: 'El acoplamiento mide cuánto depende un sistema de otro. Si es "fuerte", un cambio chico en un sistema puede romper al otro. Si es "débil", los sistemas se hablan a través de reglas claras (como una API), y pueden cambiar por dentro sin afectarse, mientras sigan respetando esas reglas.',
    resource: { type: 'article', label: 'Wikipedia: Acoplamiento (informática)', url: 'https://es.wikipedia.org/wiki/Acoplamiento_(inform%C3%A1tica)' },
  },
  {
    id: 'n3',
    title: 'Formas de conectar sistemas',
    body: 'Hay varias maneras de integrar sistemas: conectarlos de a uno directamente (simple, pero difícil de manejar si son muchos), usar un punto central que los conecta a todos, usar un "bus" que reparte los mensajes entre todos (ESB), o hacer que un sistema avise algo y otros lo reciban sin conocerse entre sí (publicación y suscripción).',
    resource: { type: 'article', label: 'Microsoft Learn: Patrón de publicador-suscriptor', url: 'https://learn.microsoft.com/es-es/azure/architecture/patterns/publisher-subscriber' },
  },
  {
    id: 'n4',
    title: 'Middleware y ESB',
    body: 'El middleware es un programa intermedio que ayuda a que dos sistemas distintos se entiendan entre sí. Un ESB es un tipo de middleware pensado para conectar muchos sistemas de una empresa: recibe un mensaje, lo traduce al formato que el otro sistema necesita, y se lo entrega.',
    resource: { type: 'video', label: 'Video: ESB, todo lo que debes saber en 3 minutos', url: 'https://www.youtube.com/watch?v=QQ-s0tIkJIE' },
  },
  {
    id: 'n5',
    title: 'Mensajes que no necesitan respuesta inmediata',
    body: 'En vez de que un sistema llame a otro y se quede esperando la respuesta ahí mismo, puede dejar el mensaje en una fila (una "cola") y seguir con lo suyo. El otro sistema lee ese mensaje cuando puede. Así, los dos sistemas no necesitan estar disponibles exactamente al mismo tiempo.',
    resource: { type: 'article', label: 'Artículo: RabbitMQ explicado en 5 minutos o menos', url: 'https://geekflare.com/es/rabbitmq-explained/' },
  },
  {
    id: 'n6',
    title: 'REST y SOAP: dos formas de comunicarse',
    body: 'REST es una forma simple de conectar sistemas por internet, usando las mismas acciones básicas que usa un navegador (pedir, crear, cambiar, borrar), casi siempre con datos en un formato llamado JSON. SOAP es más formal y estricto, usa un formato llamado XML, y se usa mucho en sistemas donde el control y la seguridad son muy importantes, como en bancos.',
    resource: { type: 'article', label: 'Artículo: REST vs. SOAP, ¿cuál es la diferencia?', url: 'https://www.arsys.es/blog/rest-vs-soap-cual-es-la-diferencia' },
  },
  {
    id: 'n7',
    title: 'Formas de compartir datos: ETL, replicación y virtualización',
    body: 'ETL significa sacar datos de un lugar, transformarlos, y llevarlos a otro lugar, normalmente en bloques (por ejemplo, una vez por noche). La replicación mantiene copias de los mismos datos actualizadas en varios sistemas al mismo tiempo. La virtualización de datos no copia nada: crea una especie de "ventana" que muestra los datos originales en el momento, sin duplicarlos en ningún lado.',
    resource: { type: 'article', label: 'Artículo: ¿Qué es ETL?', url: 'https://cloud.google.com/learn/what-is-etl?hl=es' },
  },
  {
    id: 'n8',
    title: 'Orquestación y coreografía',
    body: 'En la orquestación hay un "jefe" (un sistema central) que decide qué pasa primero, qué sistema se usa y en qué momento. En la coreografía no hay jefe: cada sistema sabe qué hacer cuando ve cierto aviso, y así el proceso avanza solo, sin que nadie lo dirija desde el centro.',
    resource: { type: 'video', label: 'Video: Orquestación o coreografía, con Marcia Villalba', url: 'https://www.youtube.com/watch?v=oZlvabdqYDs' },
  },
];

const GLOSSARY = [
  { term: 'Acoplamiento', def: 'Cuánto depende un sistema de otro. Si dependen mucho entre sí, un cambio chico puede romper todo.' },
  { term: 'API', def: 'Una forma en que un programa deja que otro use sus funciones o datos, sin tener que mostrarle cómo funciona por dentro.' },
  { term: 'Back-end', def: 'La parte de un sistema que no se ve: se encarga de la lógica, los datos y las reglas de negocio, y responde a lo que le pide el front-end.' },
  { term: 'Broker de mensajes', def: 'Un programa que recibe mensajes de un sistema y se encarga de entregárselos a otro, guardándolos mientras tanto si hace falta.' },
  { term: 'Coreografía', def: 'Forma de organizar sistemas donde cada uno reacciona solo ante ciertos avisos, sin que nadie los dirija desde un punto central.' },
  { term: 'Diseño UI', def: 'Diseño de Interfaz de Usuario: cómo se ven y se acomodan los elementos de una pantalla (colores, botones, textos), para que sea clara y agradable de usar.' },
  { term: 'Diseño UX', def: 'Diseño de Experiencia de Usuario: cómo se siente usar una aplicación de principio a fin, pensando en que sea fácil de entender y resuelva lo que la persona necesita.' },
  { term: 'Endpoint', def: 'La dirección donde un sistema pone algo a disposición para que otros lo usen.' },
  { term: 'ESB (Enterprise Service Bus)', def: 'Un programa central que ayuda a que muchos sistemas se comuniquen entre sí, ordenando y traduciendo los mensajes que se envían.' },
  { term: 'ETL', def: 'Sacar datos de un lugar, cambiarlos de formato, y guardarlos en otro lugar.' },
  { term: 'Front-end', def: 'La parte de una aplicación con la que interactúa directamente quien la usa: lo que ve y toca en la pantalla (botones, textos, imágenes).' },
  { term: 'Full stack', def: 'Un desarrollo (o una persona) que abarca tanto el front-end como el back-end de una aplicación, es decir, todas las capas necesarias para que funcione de punta a punta.' },
  { term: 'Idempotencia', def: 'Que una acción dé el mismo resultado aunque se repita varias veces por error.' },
  { term: 'Latencia', def: 'El tiempo que tarda un mensaje en llegar de un lugar a otro.' },
  { term: 'Mensajería asíncrona', def: 'Enviar un mensaje sin quedarse esperando la respuesta al instante: el otro sistema lo lee cuando puede.' },
  { term: 'Middleware', def: 'Un programa que ayuda a que dos sistemas distintos se entiendan entre sí.' },
  { term: 'Orquestación', def: 'Forma de organizar sistemas donde uno central decide el orden en que pasan las cosas.' },
  { term: 'Payload', def: 'La parte importante de un mensaje, sin contar los datos extra que lo acompañan.' },
  { term: 'Pub/Sub (Publicación/Suscripción)', def: 'Un sistema avisa que pasó algo, y todos los que están "anotados" para recibir ese aviso lo reciben, sin conocerse entre sí.' },
  { term: 'REST', def: 'Una forma simple de comunicar sistemas por internet, usando acciones básicas como pedir, crear, cambiar o borrar datos.' },
  { term: 'SOAP', def: 'Una forma más formal y estricta de comunicar sistemas, usando un formato de mensajes llamado XML.' },
  { term: 'Webhook', def: 'Cuando un sistema le avisa automáticamente a otro apenas pasa algo, en vez de que el otro tenga que estar preguntando todo el tiempo.' },
];

// Casos de estudio para debatir en clase (sin respuesta única correcta;
// pensados para que el grupo discuta y proponga una solución). La respuesta
// sugerida queda oculta en la app hasta que el usuario la despliega.
const CASES = [
  {
    id: 'c1',
    title: 'La asistencia y las notas no se hablan',
    scenario: 'En una escuela, un sistema registra la asistencia de los alumnos y otro, totalmente separado, registra las notas. Si un profesor quiere ver junto quién faltó mucho y cómo le fue en los exámenes, tiene que buscar en los dos sistemas por separado y cruzar los datos a mano.',
    questions: [
      '¿Cómo conectarían estos dos sistemas para que la información se vea junta, sin cruzarla a mano?',
      '¿Cuál de los dos sistemas debería "avisarle" al otro cuando hay un dato nuevo?',
      '¿Qué pasaría si un alumno cambia de curso y eso no se actualiza en los dos sistemas?',
    ],
    answer: 'Lo más simple sería que uno de los sistemas (por ejemplo, el de asistencia) tenga una forma de compartir sus datos, como una API, para que el otro los pueda leer y cruzar automáticamente. No hace falta unificar todo en un solo sistema: alcanza con que se "entiendan" a través de esa conexión. Si un dato como el curso de un alumno cambia, conviene que ese cambio se avise automáticamente al otro sistema, para que no queden datos desactualizados en ninguno de los dos.',
    tips: [
      '¿A alguien le pasó algo parecido con el boletín o el campus virtual del colegio? Es un buen punto de partida.',
      'Si el grupo se traba, preguntá: "¿cuál de los dos sistemas debería avisarle al otro primero?"',
      'Buen momento para nombrar el concepto de acoplamiento débil si ya lo vieron en Apuntes.',
    ],
  },
  {
    id: 'c2',
    title: 'Pedidos que llegan por dos caminos distintos',
    scenario: 'Un local de comida recibe pedidos por WhatsApp y también por su página web. Cada canal tiene su propia lista de pedidos, y a veces la cocina prepara primero un pedido que llegó después, porque no ve todo junto en un solo lugar.',
    questions: [
      '¿Cómo juntarían los pedidos de los dos canales en un solo lugar para la cocina?',
      '¿Qué dato mínimo necesitaría cada pedido para que la cocina sepa el orden correcto?',
      '¿Qué pasa si justo cuando llega un pedido se corta la conexión a internet?',
    ],
    answer: 'Conviene que los dos canales (WhatsApp y la web) manden cada pedido a un mismo lugar central apenas se genera, en vez de guardarse cada uno por su lado. Cada pedido debería llevar la hora exacta en que llegó, así ese lugar central puede ordenarlos bien sin importar de qué canal vinieron. Si se corta la conexión un momento, conviene que los pedidos que no se pudieron enviar queden guardados y se manden apenas vuelva la conexión, en vez de perderse.',
    tips: [
      'Pedí ejemplos de apps de delivery que ya usan — seguro reconocen enseguida el mismo problema.',
      'Si nadie menciona la hora exacta del pedido, guialos con: "¿cómo sabrían cuál llegó primero?"',
      'Es un buen caso para introducir la idea de timestamp si todavía no salió en la clase.',
    ],
  },
  {
    id: 'c3',
    title: 'El libro que "está" pero no está',
    scenario: 'Una biblioteca tiene un catálogo online, donde cualquiera puede ver qué libros hay, y un sistema aparte donde el bibliotecario anota los préstamos. Un día, alguien ve en el catálogo que un libro "está disponible", va a buscarlo, y resulta que ya lo habían prestado esa misma mañana.',
    questions: [
      '¿Por qué pasa este error si los dos sistemas guardan información sobre lo mismo (los libros)?',
      '¿Qué cambiarían para que el catálogo online siempre muestre la disponibilidad real?',
      '¿Conviene que sigan siendo dos sistemas separados, o unirlos en uno solo? ¿Por qué?',
    ],
    answer: 'El problema es que hay dos copias de la misma información (qué libros están disponibles) y una se actualiza sin avisarle a la otra. Para solucionarlo, cada vez que el bibliotecario registra un préstamo, ese sistema debería avisarle automáticamente al catálogo online que ese libro ya no está disponible, en vez de que cada uno mantenga su propia lista por separado. Unificar todo en un solo sistema también sería una solución, pero no siempre es práctico si los dos ya existen y funcionan bien en lo suyo: muchas veces es más fácil conectarlos que reemplazarlos.',
    tips: [
      'Arrancá preguntando: "¿les pasó comprar algo online que después no había en el local?" — mismo problema, otro rubro.',
      'Si el debate deriva en "unificar todo en un sistema", aprovechá para hablar de costos y riesgos de migrar sistemas que ya funcionan bien.',
    ],
  },
  {
    id: 'c4',
    title: 'Registrarse dos veces en el mismo club',
    scenario: 'Un club de fútbol tiene una app para socios y otra, distinta, para comprar entradas a los partidos. Para usar las dos, cada persona tiene que cargar su nombre, DNI y datos de contacto por separado, como si fueran clubes distintos.',
    questions: [
      '¿Cómo evitarían que la gente tenga que cargar los mismos datos dos veces?',
      '¿Qué sistema debería guardar los datos "originales" de cada socio, y por qué?',
      '¿Qué pasaría si alguien cambia su número de teléfono en una de las dos apps?',
    ],
    answer: 'La solución típica es que un solo sistema guarde los datos personales de cada socio (por ejemplo, la app de socios), y que la app de entradas, en vez de pedir los datos de nuevo, se conecte a ese sistema para usarlos (por ejemplo, con un botón de "iniciar sesión con tu cuenta de socio"). Si alguien cambia su teléfono, ese cambio debería hacerse en un solo lugar y reflejarse automáticamente en el otro, en vez de actualizarlo dos veces por separado.',
    tips: [
      'Preguntá cuántas veces cargaron los mismos datos en dos apps distintas — genera enganche rápido.',
      'Si no aparece sola, guialos hacia la idea de "iniciar sesión con una sola cuenta" (como Google o Apple ID).',
    ],
  },
  {
    id: 'c5',
    title: 'El stock que no coincide',
    scenario: 'Una tienda de ropa vende tanto en su local físico como en su página web. Una remera se vende en el local, pero la página web sigue mostrando que hay stock disponible, así que alguien la compra por internet sin saber que ya no queda ninguna.',
    questions: [
      '¿Qué tendría que pasar apenas se vende algo en el local, para que la web se entere?',
      '¿Conviene que el local y la web consulten el mismo lugar para saber el stock, o que cada uno tenga su propia lista?',
      '¿Qué harían con el pedido de la persona que compró por la web una remera que ya no había?',
    ],
    answer: 'Lo ideal es que exista un único lugar donde se guarda el stock real, y que tanto el local como la web lo consulten y lo actualicen ahí mismo, en vez de que cada uno tenga su propia lista separada. Así, apenas se vende algo en el local, la web ve el stock actualizado al instante. Como ningún sistema es perfecto, también conviene tener un plan para cuando igual pasa un error: por ejemplo, avisarle rápido al cliente y ofrecerle un cambio o la devolución del dinero.',
    tips: [
      'Preguntá si alguien compró algo que "estaba" pero después le avisaron que no había stock.',
      'Empujá el debate hacia quién debería ser el "dueño" del dato de stock: ¿el local, la web, o un tercero?',
      'Cerrá señalando que ningún sistema es perfecto: siempre conviene un plan B para cuando falla la sincronización.',
    ],
  },
  {
    id: 'c6',
    title: 'El turno sin pagar',
    scenario: 'Un gimnasio usa una app para que la gente reserve turnos de clases, y otra completamente distinta para pagar la cuota mensual. Alguien puede reservar un turno sin haber pagado, porque las dos apps no se comunican entre sí.',
    questions: [
      '¿Cómo harían para que la app de turnos sepa si alguien pagó o no antes de dejarlo reservar?',
      '¿Qué pasaría si el pago se acredita recién unos minutos después de intentar pagar?',
      '¿Es un problema grave que alguien reserve sin pagar, o depende del gimnasio? ¿Por qué?',
    ],
    answer: 'La app de turnos necesitaría poder preguntarle a la app de pagos, a través de una conexión entre las dos, si esa persona está al día antes de confirmarle el turno. El problema es que los pagos a veces tardan unos minutos en confirmarse, así que conviene decidir qué hacer en ese margen: por ejemplo, dejar reservar igual pero avisar que el turno se cancela si el pago no se confirma en un tiempo determinado. La gravedad del problema depende del gimnasio: si hay pocos lugares por clase, dejar reservar sin pagar puede hacer que alguien que sí pagó se quede sin lugar.',
    tips: [
      'Preguntá qué pasaría si esto fuera con dinero real en una app de banco, para subir la temperatura del debate.',
      'Si nadie lo menciona, introducí la palabra "idempotencia" y pregunten juntos por qué importa acá.',
      'Buen cierre: pedirles que decidan una regla concreta ("dejamos reservar X minutos igual, después se cancela").',
    ],
  },
];

// Cuestionario de opción única
const QUESTIONS = [
  {
    id: 'q1',
    text: '¿Qué significa "integrar sistemas"?',
    options: [
      'Instalar el mismo sistema operativo en todos los equipos',
      'Hacer que programas o sistemas distintos se conecten y compartan información entre sí',
      'Migrar toda la infraestructura a la nube',
      'Comprar todo el software a un único proveedor',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    text: '¿Cuál de estas opciones es un ejemplo de middleware para conectar sistemas?',
    options: [
      'Un Enterprise Service Bus (ESB)',
      'Un editor de texto',
      'Un sistema operativo',
      'Una hoja de cálculo',
    ],
    correctIndex: 0,
  },
  {
    id: 'q3',
    text: '¿Qué quiere decir que dos sistemas tengan "acoplamiento débil"?',
    options: [
      'Que comparten la misma base de datos directamente',
      'Que dependen lo menos posible entre sí, y se comunican mediante reglas claras',
      'Que se ejecutan en el mismo servidor físico',
      'Que no pueden comunicarse entre sí',
    ],
    correctIndex: 1,
  },
  {
    id: 'q4',
    text: '¿Qué forma de conectar sistemas usa una fila de mensajes, para que el que envía y el que recibe no tengan que estar disponibles al mismo tiempo?',
    options: [
      'Conexión directa por sockets',
      'Mensajería asíncrona (cola de mensajes)',
      'Acceso compartido a archivos planos',
      'Copia manual de datos',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    text: '¿Cuál es la diferencia principal entre orquestación y coreografía?',
    options: [
      'No hay ninguna diferencia, son lo mismo',
      'La orquestación usa una base de datos y la coreografía no',
      'En la orquestación, un sistema central dirige todo; en la coreografía, cada sistema reacciona solo, sin un director central',
      'La coreografía solo se usa con archivos por FTP',
    ],
    correctIndex: 2,
  },
  {
    id: 'q6',
    text: '¿Qué forma de comunicación usa las acciones básicas de internet (pedir, crear, cambiar, borrar) sobre una dirección web?',
    options: ['SOAP', 'REST', 'FTP', 'SNMP'],
    correctIndex: 1,
  },
  {
    id: 'q7',
    text: '¿Qué es un ESB (Enterprise Service Bus)?',
    options: [
      'Un método para cifrar datos',
      'Un programa central que ordena, traduce y entrega mensajes entre varios sistemas',
      'Un tipo de base de datos',
      'Un lenguaje de programación',
    ],
    correctIndex: 1,
  },
  {
    id: 'q8',
    text: '¿Cuál de las siguientes NO es una forma de compartir datos entre sistemas?',
    options: [
      'ETL (sacar, transformar y cargar datos)',
      'Replicación de bases de datos',
      'Virtualización de datos',
      'Reinstalar el sistema operativo del servidor',
    ],
    correctIndex: 3,
  },
  {
    id: 'q9',
    text: '¿Qué ventaja tiene usar una API en vez de entrar directamente a la base de datos de otro sistema?',
    options: [
      'Ninguna, son igual de riesgosas',
      'La API ofrece una forma estable y controlada de acceder, sin depender de cómo el otro sistema guarda sus datos por dentro',
      'Siempre es más rápida en todos los casos',
      'Elimina la necesidad de pedir permiso para usarla',
    ],
    correctIndex: 1,
  },
  {
    id: 'q10',
    text: '¿Qué formato de datos se usa más para enviar información en las APIs modernas?',
    options: ['JSON', 'COBOL copybook', 'EBCDIC', 'Postscript'],
    correctIndex: 0,
  },
];

// Errores comunes: malentendidos típicos sobre integración de sistemas,
// aclarados en pocas líneas. Se muestran dentro de la pestaña Apuntes.
const MISCONCEPTIONS = [
  {
    id: 'm1',
    title: 'Integrar sistemas es lo mismo que exportar un Excel y subirlo a otro lado',
    body: 'Pasar datos a mano de un sistema a otro (por ejemplo, exportar un Excel y cargarlo en otro programa) no es integración de verdad: es un parche manual, propenso a errores, que alguien tiene que acordarse de hacer cada vez. Una integración real conecta los sistemas para que el intercambio de datos sea automático, sin que una persona tenga que mover archivos de un lado a otro.',
  },
  {
    id: 'm2',
    title: 'Cuanta más tecnología (ESB, microservicios, colas) se use, mejor integración',
    body: 'No todas las integraciones necesitan la misma complejidad. Conectar dos sistemas simples con una llamada directa (point-to-point) puede ser perfectamente razonable. Meter un ESB o una arquitectura de microservicios para un caso chico agrega complejidad innecesaria, más cosas que mantener, y más lugares donde algo puede salir mal.',
  },
  {
    id: 'm3',
    title: "Si un sistema tiene una API, ya está \"integrado\" con los demás",
    body: 'Tener una API disponible no significa que los sistemas se estén comunicando de verdad. La API es solo la puerta: alguien tiene que construir la conexión que realmente la use, manejar los errores, y mantenerla funcionando con el tiempo. Publicar una API es el primer paso, no la integración en sí.',
  },
  {
    id: 'm4',
    title: 'Una vez que la integración está hecha, ya no hay que tocarla más',
    body: 'Los sistemas cambian: se actualizan versiones, cambian formatos de datos, se agregan funciones nuevas. Una integración que funciona hoy puede romperse si uno de los dos sistemas cambia su forma de exponer los datos. Por eso las integraciones necesitan mantenimiento, igual que cualquier otro software.',
  },
  {
    id: 'm5',
    title: 'Acoplamiento débil significa que los sistemas no dependen de nada',
    body: 'Acoplamiento débil no es depender de cero: siempre hay alguna dependencia, al menos respetar el formato de los mensajes o el contrato de una API. Lo que busca el acoplamiento débil es que esa dependencia sea mínima y esté bien definida, para que un cambio interno en un sistema no obligue a cambiar también al otro.',
  },
  {
    id: 'm6',
    title: 'REST siempre es mejor que SOAP, porque es más moderno',
    body: "REST es más simple y liviano, pero eso no lo hace automáticamente \"mejor\" para cualquier caso. SOAP sigue siendo una opción válida cuando se necesita un contrato muy formal, validaciones estrictas o mecanismos de seguridad específicos, como en algunos sistemas bancarios o gubernamentales. La elección depende del contexto, no de cuál salió después.",
  },
];
