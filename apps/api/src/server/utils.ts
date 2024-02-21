export type SqlError = {
  message: string;
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

export const isSqlError = (err: any): err is SqlError => {
  const hasMessage = typeof err.message === 'string';
  const hasCode = typeof err.code === 'string';
  const hasErrno = typeof err.errno === 'number';
  const hasSql = typeof err.sql === 'string';
  const hasSqlState = typeof err.sqlState === 'string';
  const hasSqlMessage = typeof err.sqlMessage === 'string';

  return hasMessage && hasCode && hasErrno && hasSql && hasSqlState && hasSqlMessage;
};
