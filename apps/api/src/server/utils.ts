export type SqlError = {
  message: string;
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

export const isSqlError = (err: unknown): err is SqlError => {
  const sqlErr = err as SqlError; // Assume the error is an SqlError

  const hasMessage = typeof sqlErr.message === 'string';
  const hasCode = typeof sqlErr.code === 'string';
  const hasErrno = typeof sqlErr.errno === 'number';
  const hasSql = typeof sqlErr.sql === 'string';
  const hasSqlState = typeof sqlErr.sqlState === 'string';
  const hasSqlMessage = typeof sqlErr.sqlMessage === 'string';

  return hasMessage && hasCode && hasErrno && hasSql && hasSqlState && hasSqlMessage;
};
