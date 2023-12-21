import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm'

export default class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public foreignKeyName (tableOrName: Table | string,
    columnNames: string[]): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name
    const columnsName = columnNames.join('_')
    return `${tableOrName}_${columnsName}_fkey`
  }
}

