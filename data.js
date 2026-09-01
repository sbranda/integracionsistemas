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
  },
  {
    id: 'n2',
    title: 'Acoplamiento fuerte vs. débil',
    body: 'El acoplamiento mide cuánto depende un sistema de otro. Si es "fuerte", un cambio chico en un sistema puede romper al otro. Si es "débil", los sistemas se hablan a través de reglas claras (como una API), y pueden cambiar por dentro sin afectarse, mientras sigan respetando esas reglas.',
  },
  {
    id: 'n3',
    title: 'Formas de conectar sistemas',
    body: 'Hay varias maneras de integrar sistemas: conectarlos de a uno directamente (simple, pero difícil de manejar si son muchos), usar un punto central que los conecta a todos, usar un "bus" que reparte los mensajes entre todos (ESB), o hacer que un sistema avise algo y otros lo reciban sin conocerse entre sí (publicación y suscripción).',
  },
  {
    id: 'n4',
    title: 'Middleware y ESB',
    body: 'El middleware es un programa intermedio que ayuda a que dos sistemas distintos se entiendan entre sí. Un ESB es un tipo de middleware pensado para conectar muchos sistemas de una empresa: recibe un mensaje, lo traduce al formato que el otro sistema necesita, y se lo entrega.',
  },
  {
    id: 'n5',
    title: 'Mensajes que no necesitan respuesta inmediata',
    body: 'En vez de que un sistema llame a otro y se quede esperando la respuesta ahí mismo, puede dejar el mensaje en una fila (una "cola") y seguir con lo suyo. El otro sistema lee ese mensaje cuando puede. Así, los dos sistemas no necesitan estar disponibles exactamente al mismo tiempo.',
  },
  {
    id: 'n6',
    title: 'REST y SOAP: dos formas de comunicarse',
    body: 'REST es una forma simple de conectar sistemas por internet, usando las mismas acciones básicas que usa un navegador (pedir, crear, cambiar, borrar), casi siempre con datos en un formato llamado JSON. SOAP es más formal y estricto, usa un formato llamado XML, y se usa mucho en sistemas donde el control y la seguridad son muy importantes, como en bancos.',
  },
  {
    id: 'n7',
    title: 'Formas de compartir datos: ETL, replicación y virtualización',
    body: 'ETL significa sacar datos de un lugar, transformarlos, y llevarlos a otro lugar, normalmente en bloques (por ejemplo, una vez por noche). La replicación mantiene copias de los mismos datos actualizadas en varios sistemas al mismo tiempo. La virtualización de datos no copia nada: crea una especie de "ventana" que muestra los datos originales en el momento, sin duplicarlos en ningún lado.',
  },
  {
    id: 'n8',
    title: 'Orquestación y coreografía',
    body: 'En la orquestación hay un "jefe" (un sistema central) que decide qué pasa primero, qué sistema se usa y en qué momento. En la coreografía no hay jefe: cada sistema sabe qué hacer cuando ve cierto aviso, y así el proceso avanza solo, sin que nadie lo dirija desde el centro.',
  },
];

const GLOSSARY = [
  { term: 'Acoplamiento', def: 'Cuánto depende un sistema de otro. Si dependen mucho entre sí, un cambio chico puede romper todo.' },
  { term: 'API', def: 'Una forma en que un programa deja que otro use sus funciones o datos, sin tener que mostrarle cómo funciona por dentro.' },
  { term: 'Broker de mensajes', def: 'Un programa que recibe mensajes de un sistema y se encarga de entregárselos a otro, guardándolos mientras tanto si hace falta.' },
  { term: 'Coreografía', def: 'Forma de organizar sistemas donde cada uno reacciona solo ante ciertos avisos, sin que nadie los dirija desde un punto central.' },
  { term: 'Endpoint', def: 'La dirección donde un sistema pone algo a disposición para que otros lo usen.' },
  { term: 'ESB (Enterprise Service Bus)', def: 'Un programa central que ayuda a que muchos sistemas se comuniquen entre sí, ordenando y traduciendo los mensajes que se envían.' },
  { term: 'ETL', def: 'Sacar datos de un lugar, cambiarlos de formato, y guardarlos en otro lugar.' },
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
// pensados para que el grupo discuta y proponga una solución).
const CASES = [
  {
    id: 'c1',
    title: 'El sistema viejo que nadie quiere tocar',
    scenario: 'Una empresa de logística usa desde hace 15 años un sistema de facturación que funciona bien, pero solo entrega los datos en archivos que genera una vez por noche. Ahora quieren mostrar el estado de las facturas en una app, al instante.',
    questions: [
      '¿Convendría cambiar el sistema viejo, agregarle algo por afuera que lo conecte mejor, o reemplazarlo directamente por uno nuevo? ¿Qué tendrían en cuenta para decidir?',
      '¿Cómo harían para pasar de "un archivo por noche" a "información al instante" sin reescribir todo el sistema viejo?',
      '¿Qué riesgos tiene cada camino, a corto y a largo plazo?',
    ],
  },
  {
    id: 'c2',
    title: 'Pico de pedidos en el Hot Sale',
    scenario: 'Una tienda online conecta sus sistemas de ventas, stock y envíos llamándose directamente entre sí. En una fecha con muchas ventas, el sistema de envíos se satura y empieza a fallar, y esa falla también frena las ventas.',
    questions: [
      '¿Cómo cambiarían la forma en que se conectan los sistemas para que, si uno falla, no se caigan los demás?',
      '¿En qué ayudaría poner una "fila de espera" (una cola de mensajes) entre las ventas y los envíos?',
      '¿Qué se pierde y qué se gana si el cliente ya no recibe la confirmación de su compra al instante?',
    ],
  },
  {
    id: 'c3',
    title: '¿ESB o microservicios?',
    scenario: 'Una empresa conecta 6 sistemas usando un programa central (ESB). Los programadores se quejan de que cualquier cambio chico tarda mucho, porque siempre depende de ese equipo central. Alguien propone dejar de usar el ESB y que los sistemas se avisen entre sí con eventos.',
    questions: [
      '¿Qué se gana y qué se pierde al dejar de tener un punto central que organice todo?',
      '¿Conviene cambiar todo de golpe, o se puede ir migrando de a poco?',
      'Si ya no hay nadie "mirando todo desde el centro", ¿cómo se darían cuenta de qué pasó si algo sale mal?',
    ],
  },
  {
    id: 'c4',
    title: 'Los datos no coinciden entre sistemas',
    scenario: 'Una clínica guarda los datos de sus pacientes en dos sistemas distintos: uno de turnos y otro de historias clínicas. Un día se dan cuenta de que el teléfono de un paciente es distinto en cada sistema, porque solo lo actualizaron en uno de los dos.',
    questions: [
      '¿Qué forma de mantener los datos iguales entre sistemas hubiera evitado este problema?',
      '¿Cuál de los dos sistemas debería ser el que tiene la información correcta, y por qué?',
      '¿Cómo se darían cuenta de este tipo de error antes de que lo note un paciente?',
    ],
  },
  {
    id: 'c5',
    title: 'REST, SOAP y un banco',
    scenario: 'Un banco quiere que una empresa externa (una fintech) pueda hacer transferencias desde su propia app. El equipo de seguridad del banco pide reglas muy estrictas para cada mensaje. La fintech prefiere algo simple y rápido de conectar.',
    questions: [
      '¿Qué forma de comunicación elegirían, pensando en las dos necesidades?',
      '¿Se puede tener seguridad fuerte sin perder toda la simplicidad que pide la fintech? ¿Cómo?',
      '¿Qué otras cosas, además de la forma de comunicarse, ayudarían a que esta conexión sea segura?',
    ],
  },
  {
    id: 'c6',
    title: 'Un aviso automático que nunca llega',
    scenario: 'Una plataforma de pagos le avisa a una tienda, con un mensaje automático (un webhook), cuando se aprueba un pago. Un día, por un problema de red, ese mensaje nunca llega, y la tienda nunca se entera de que el cliente ya pagó.',
    questions: [
      '¿Qué harían para que este tipo de fallas no dejen pedidos sin resolver?',
      '¿Por qué conviene que la acción de marcar "pedido pagado" dé el mismo resultado aunque se haga dos veces por error?',
      '¿Confiarían solo en ese aviso automático, o sumarían otra forma de revisar si el pago llegó?',
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
