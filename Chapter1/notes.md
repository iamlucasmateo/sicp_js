# Notes

**operator combinations**: evaluate the operand expressions of the combinations, apply the operator functions.

**substitution model** for function application: a model of how the computer evaluates a function call stack, by substituting intermediate steps.

**normal-order evaluation**: reduce the call stack to one big, "lined up" operation, then apply. You may end up repeating some operations in this way.

**applicative-order evaluation**: apply as you go, then calculate final result. You may end up raising errors that normal-order would have saved you of (e.g. a stack overflow that would have been prevented by short switching, as in Ex1.5)