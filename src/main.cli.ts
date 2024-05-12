#!/usr/bin/env node

import {
  CLIApplication,
  GenerateCommand,
  HelpCommand,
  ImportCommand,
  VersionCommand,
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();

// npm run ts ./src/main.cli.ts -- --generate 10 ./mocks/generated/new-data.tsv http://localhost:3123/api
// npm run ts ./src/main.cli.ts -- --import ./mocks/generated/new-data.tsv
