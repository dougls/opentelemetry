const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-node');

const traceExporter = new OTLPTraceExporter({
  url: 'http://otel-collector:4318/v1/traces',
});

const sdk = new NodeSDK({
  traceExporter: traceExporter,
  sampler: new TraceIdRatioBasedSampler(1),

  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),

  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log('OpenTelemetry SDK iniciado e configurado para exportar para o Collector.');

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing-SDK terminado com sucesso.'))
    .catch((error) => console.log('Erro ao terminar o Tracing-SDK.', error))
    .finally(() => process.exit(0));
});
