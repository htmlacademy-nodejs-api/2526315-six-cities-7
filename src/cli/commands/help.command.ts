import { Command } from './command.interface.js';
import chalk from 'chalk';
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(`
        ${chalk.green('Программа для подготовки данных для REST API сервера.')}
        ${chalk.yellow('Пример:')}
            cli.js --<command> [--arguments]
        ${chalk.yellow('Команды:')}
            --version:                   ${chalk.cyan('# выводит номер версии')}
            --help:                      ${chalk.cyan('# печатает этот текст')}
            --import <path>:             ${chalk.cyan('# импортирует данные из TSV')}
            --generate <n> <path> <url>  ${chalk.cyan('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
