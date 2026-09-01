// ---------------------------------------------------------------------------
// Contenido de la app — Integración de Sistemas
// Todo vive en el cliente (sin backend). Editá estos arreglos para
// actualizar el contenido.
// ---------------------------------------------------------------------------

const NOTES = [
  {
    id: 'n1',
    title: '¿Qué es la integración de sistemas?',
    body: 'Es el proceso de conectar aplicaciones, servicios o sistemas independientes para que trabajen juntos como si fueran uno solo, compartiendo datos y funcionalidad. El objetivo es evitar que cada sistema quede aislado ("isla de información") y que la organización tenga procesos consistentes de punta a punta.',
  },
  {
    id: 'n2',
    title: 'Acoplamiento fuerte vs. débil',
    body: 'El acoplamiento describe cuánto depende un sistema de los detalles internos de otro. En un acoplamiento fuerte, un cambio en un sistema rompe fácilmente al otro. En un acoplamiento débil, los sistemas se comunican por interfaces bien definidas (APIs, mensajes) y pueden cambiar por dentro sin afectar al resto, siempre que respeten el contrato de esa interfaz.',
  },
  {
    id: 'n3',
    title: 'Patrones de integración',
    body: 'Algunos patrones comunes: Point-to-Point (conexión directa entre dos sistemas, simple pero difícil de escalar), Hub-and-Spoke (un nodo central conecta a todos, reduce conexiones directas), Bus de servicios / ESB (middleware que enruta y transforma mensajes entre sistemas) y Publicación/Suscripción (un emisor publica eventos y varios receptores se suscriben sin conocerse entre sí).',
  },
  {
    id: 'n4',
    title: 'Middleware y ESB',
    body: 'El middleware es software intermedio que conecta sistemas distintos, ocupándose de tareas como enrutamiento, transformación de formatos y manejo de errores. Un Enterprise Service Bus (ESB) es un tipo de middleware pensado para integrar muchos sistemas empresariales: recibe mensajes, los transforma al formato que necesita el receptor y los entrega, actuando como intermediario central.',
  },
  {
    id: 'n5',
    title: 'Mensajería asíncrona',
    body: 'En vez de que un sistema llame directamente a otro y espere respuesta, se usa una cola de mensajes: el emisor deja el mensaje en la cola y sigue con lo suyo; el receptor lo procesa cuando puede. Esto desacopla a los sistemas en el tiempo (no necesitan estar disponibles al mismo momento) y ayuda a absorber picos de carga.',
  },
  {
    id: 'n6',
    title: 'REST vs. SOAP',
    body: 'REST es un estilo de arquitectura que usa operaciones HTTP estándar (GET, POST, PUT, DELETE) sobre recursos identificados por URL, típicamente con JSON. Es liviano y muy usado en APIs web actuales. SOAP es un protocolo más formal basado en XML, con contratos estrictos (WSDL) y más overhead, común en sistemas empresariales o financieros donde se prioriza la validación estricta y la seguridad a nivel de mensaje.',
  },
  {
    id: 'n7',
    title: 'Integración de datos: ETL, replicación y virtualización',
    body: 'ETL (Extracción, Transformación y Carga) mueve datos de un origen a un destino, transformándolos en el camino, típicamente en procesos por lotes. La replicación mantiene copias sincronizadas de los mismos datos en distintos sistemas. La virtualización de datos, en cambio, no mueve ni copia nada: crea una capa que consulta los datos en su origen en tiempo real, dando una vista unificada sin duplicar información.',
  },
  {
    id: 'n8',
    title: 'Orquestación vs. coreografía',
    body: 'En la orquestación, un componente central (el "orquestador") dirige el flujo: decide qué servicio se llama, cuándo y con qué datos. En la coreografía no hay un director central: cada servicio sabe a qué eventos reaccionar y publica sus propios eventos cuando termina su parte, generando el flujo de forma descentralizada.',
  },
];

const GLOSSARY = [
  { term: 'Acoplamiento', def: 'Grado de dependencia entre dos sistemas. Cuanto más "fuerte", más frágil es la integración ante cambios.' },
  { term: 'API', def: 'Interfaz de Programación de Aplicaciones: conjunto de reglas que permite que un sistema use funciones o datos de otro sin conocer su implementación interna.' },
  { term: 'Broker de mensajes', def: 'Software intermediario (ej. RabbitMQ, Kafka) que recibe, guarda y entrega mensajes entre sistemas, habilitando la mensajería asíncrona.' },
  { term: 'Coreografía', def: 'Forma de coordinar servicios donde cada uno reacciona a eventos por su cuenta, sin un controlador central.' },
  { term: 'Endpoint', def: 'Dirección (URL) donde un sistema expone una funcionalidad o recurso para que otros lo consuman.' },
  { term: 'ESB (Enterprise Service Bus)', def: 'Middleware que centraliza el enrutamiento, transformación y mediación de mensajes entre múltiples sistemas.' },
  { term: 'ETL', def: 'Extracción, Transformación y Carga: proceso por lotes para mover datos entre sistemas, adaptando su formato en el camino.' },
  { term: 'Idempotencia', def: 'Propiedad de una operación que produce el mismo resultado sin importar cuántas veces se ejecute (importante si un mensaje se reenvía por error).' },
  { term: 'Latencia', def: 'Tiempo que tarda un mensaje o solicitud en llegar de un punto a otro dentro de una integración.' },
  { term: 'Mensajería asíncrona', def: 'Comunicación donde el emisor no espera respuesta inmediata: deja el mensaje en una cola y el receptor lo procesa cuando puede.' },
  { term: 'Middleware', def: 'Software intermedio que conecta y coordina sistemas distintos, ocultando su complejidad interna.' },
  { term: 'Orquestación', def: 'Forma de coordinar servicios donde un componente central decide el orden y las condiciones de cada llamada.' },
  { term: 'Payload', def: 'El contenido "útil" de un mensaje, sin contar cabeceras ni metadatos de control.' },
  { term: 'Pub/Sub (Publicación/Suscripción)', def: 'Patrón donde un emisor publica eventos y varios receptores suscritos los reciben, sin que emisor y receptores se conozcan entre sí.' },
  { term: 'REST', def: 'Estilo de arquitectura para APIs web basado en operaciones HTTP estándar sobre recursos identificados por URL.' },
  { term: 'SOAP', def: 'Protocolo de mensajería basado en XML, con contratos formales (WSDL), usado en integraciones empresariales que requieren validación estricta.' },
  { term: 'Webhook', def: 'Mecanismo donde un sistema notifica a otro automáticamente mediante una llamada HTTP cuando ocurre un evento, en vez de que el otro pregunte periódicamente.' },
];

// Casos de estudio para debatir en clase (sin respuesta única correcta;
// pensados para que el grupo discuta y proponga una solución fundamentada).
const CASES = [
  {
    id: 'c1',
    title: 'El sistema viejo que nadie quiere tocar',
    scenario: 'Una empresa de logística tiene un sistema de facturación de hace 15 años que funciona bien, pero solo expone datos a través de archivos planos que genera cada noche. Quieren integrarlo con una nueva app móvil que necesita ver el estado de las facturas en tiempo real.',
    questions: [
      '¿Convendría modificar el sistema viejo, envolverlo con una API intermedia, o reemplazarlo directamente? ¿Qué factores pesan en esa decisión?',
      '¿Qué patrón de integración usarían para pasar de "archivo por lote" a "tiempo real" sin reescribir todo el sistema legado?',
      '¿Qué riesgos tiene cada opción a corto y a largo plazo?',
    ],
  },
  {
    id: 'c2',
    title: 'Pico de pedidos en el Hot Sale',
    scenario: 'Un e-commerce integra su sistema de ventas con el de stock y el de envíos mediante llamadas directas (point-to-point) entre APIs. Durante el Hot Sale, el sistema de envíos se cae por la cantidad de pedidos y empieza a rechazar solicitudes, lo que también frena las ventas.',
    questions: [
      '¿Cómo cambiaría la arquitectura para que una caída del sistema de envíos no afecte a las ventas?',
      '¿En qué ayudaría (o no) introducir una cola de mensajes en este escenario?',
      '¿Qué trade-offs implica pasar de comunicación síncrona a asíncrona para el cliente que espera la confirmación de su compra?',
    ],
  },
  {
    id: 'c3',
    title: '¿ESB o microservicios?',
    scenario: 'Una empresa mediana tiene 6 sistemas conectados mediante un ESB central. El equipo de desarrollo se quejó de que cada cambio chico requiere coordinar con el equipo que administra el ESB, lo que hace todo más lento. Alguien propone migrar a una arquitectura de microservicios con comunicación por eventos.',
    questions: [
      '¿Qué ventajas y desventajas tiene centralizar la integración en un ESB frente a descentralizarla en eventos entre microservicios?',
      '¿Es una decisión "todo o nada", o se puede convivir con ambos modelos durante una transición?',
      '¿Qué pasaría con la trazabilidad de un proceso de negocio si ya no hay un componente central que lo orqueste?',
    ],
  },
  {
    id: 'c4',
    title: 'Los datos no coinciden entre sistemas',
    scenario: 'Una clínica tiene los datos de pacientes replicados entre el sistema de turnos y el de historias clínicas. Un día detectan que el teléfono de un paciente es distinto en cada sistema porque se actualizó solo en uno de los dos.',
    questions: [
      '¿Qué estrategia de integración de datos evitaría este problema: ETL periódico, replicación en tiempo real, o virtualización de datos? ¿Por qué?',
      '¿Cuál sistema debería ser la "fuente de verdad" para el dato del teléfono, y cómo se refleja esa decisión en la arquitectura?',
      '¿Cómo detectarían este tipo de inconsistencias antes de que las note un paciente?',
    ],
  },
  {
    id: 'c5',
    title: 'REST, SOAP y un banco',
    scenario: 'Un banco necesita exponer una funcionalidad para que una fintech externa pueda iniciar transferencias desde su propia app. El equipo de seguridad pide validación estricta de cada mensaje y un contrato formal; el equipo de desarrollo de la fintech preferiría algo liviano y rápido de integrar.',
    questions: [
      '¿Qué estilo (REST o SOAP) recomendarían para este caso, considerando ambas prioridades?',
      '¿Es posible cumplir los requisitos de seguridad del banco sin sacrificar toda la simplicidad que pide la fintech? ¿Cómo?',
      '¿Qué otros mecanismos (además del protocolo elegido) ayudarían a dar seguridad a esta integración?',
    ],
  },
  {
    id: 'c6',
    title: 'Un webhook que nunca llega',
    scenario: 'Una plataforma de pagos le avisa a una tienda online mediante un webhook cuando un pago se aprueba. Un día, por un problema de red, el webhook nunca llega y la tienda nunca marca el pedido como pagado, aunque el cliente sí pagó.',
    questions: [
      '¿Qué mecanismos de resiliencia agregarían para que este tipo de fallas no dejen pedidos "colgados"?',
      '¿Por qué es importante que la operación de marcar un pedido como pagado sea idempotente en este escenario?',
      '¿Confiarían solo en el webhook, o combinarían ese mecanismo con alguna otra estrategia (por ejemplo, consultar el estado periódicamente)?',
    ],
  },
];

const QUESTIONS = [
  {
    id: 'q1',
    text: '¿Qué se entiende por "integración de sistemas"?',
    options: [
      'Instalar el mismo sistema operativo en todos los equipos',
      'Hacer que aplicaciones o sistemas independientes intercambien datos y funcionen como un todo coherente',
      'Migrar toda la infraestructura a la nube',
      'Comprar todo el software a un único proveedor',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    text: '¿Cuál de estos es un ejemplo típico de middleware de integración?',
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
    text: 'En integración de sistemas, ¿qué significa "acoplamiento débil" (loose coupling)?',
    options: [
      'Los sistemas comparten la misma base de datos directamente',
      'Los sistemas dependen lo mínimo posible entre sí, comunicándose por interfaces bien definidas',
      'Los sistemas se ejecutan en el mismo servidor físico',
      'Los sistemas no pueden comunicarse entre sí',
    ],
    correctIndex: 1,
  },
  {
    id: 'q4',
    text: '¿Qué patrón de integración usa una cola de mensajes para desacoplar emisor y receptor en el tiempo?',
    options: [
      'Point-to-Point directo por sockets',
      'Message Queue (mensajería asíncrona)',
      'Acceso compartido a archivos planos',
      'Copia manual de datos',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    text: '¿Cuál es la diferencia principal entre orquestación y coreografía en integración de procesos?',
    options: [
      'No hay ninguna diferencia, son sinónimos',
      'La orquestación usa una base de datos y la coreografía no',
      'En la orquestación un componente central dirige el flujo; en la coreografía cada servicio reacciona a eventos sin un director central',
      'La coreografía solo aplica a integraciones por FTP',
    ],
    correctIndex: 2,
  },
  {
    id: 'q6',
    text: '¿Qué protocolo/estilo se basa en operaciones HTTP (GET, POST, PUT, DELETE) sobre recursos identificados por URL?',
    options: ['SOAP', 'REST', 'FTP', 'SNMP'],
    correctIndex: 1,
  },
  {
    id: 'q7',
    text: '¿Qué es un ESB (Enterprise Service Bus)?',
    options: [
      'Un protocolo de cifrado de datos',
      'Una infraestructura de middleware que enruta, transforma y media mensajes entre múltiples sistemas',
      'Un tipo de base de datos relacional',
      'Un lenguaje de programación para integraciones',
    ],
    correctIndex: 1,
  },
  {
    id: 'q8',
    text: '¿Cuál de las siguientes NO es una estrategia típica de integración de datos?',
    options: [
      'ETL (Extracción, Transformación y Carga)',
      'Replicación de bases de datos',
      'Virtualización de datos',
      'Reinstalar el sistema operativo del servidor',
    ],
    correctIndex: 3,
  },
  {
    id: 'q9',
    text: '¿Qué ventaja principal ofrece usar una API como mecanismo de integración frente al acceso directo a la base de datos de otro sistema?',
    options: [
      'Ninguna, son equivalentes en riesgo y mantenimiento',
      'Expone una interfaz estable y controlada, sin acoplar los sistemas a la estructura interna de datos del otro',
      'Es siempre más rápida en todos los casos',
      'Elimina la necesidad de autenticación',
    ],
    correctIndex: 1,
  },
  {
    id: 'q10',
    text: '¿Qué formato de datos es el más común para el intercambio de mensajes en APIs REST modernas?',
    options: ['JSON', 'COBOL copybook', 'EBCDIC', 'Postscript'],
    correctIndex: 0,
  },
];
