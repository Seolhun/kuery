export interface KueryOperatorMap {
  /**
   * Matches values that are equal to a specified value.
   */
  $eq: string;
  /**
   * Matches values that are greater than a specified value.
   */
  $gt: string;
  /**
   * Matches values that are greater than or equal to a specified value.
   */
  $gte: string;
  /**
   * Matches any of the values specified in an array.
   */
  $in: string;
  /**
   * Matches values that are less than a specified value.
   */
  $lt: string;
  /**
   * Matches values that are less than or equal to a specified value.
   */
  $lte: string;
  /**
   * Matches all values that are not equal to a specified value.
   */
  $ne: string;
  /**
   * Matches none of the values specified in an array.
   */
  $nin: string;
}

export interface KueryLogicalMap {
  /**
   * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
   */
  $and: string;
  /**
   * Inverts the effect of a query expression and returns documents that do not match the query expression.
   */
  $not: string;
  /**
   * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
   */
  $nor: string;
  /**
   * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
   */
  $or: string;
}
