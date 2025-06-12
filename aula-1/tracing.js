const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/exporter-traces-console');
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-node');

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  sampler: new TraceIdRatioBasedSampler(1),

  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),

  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log('OpenTelemetry SDK iniciado.');

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing-SDK terminado com sucesso.'))
    .catch((error) => console.log('Erro ao terminar o Tracing-SDK.', error))
    .finally(() => process.exit(0));
});
