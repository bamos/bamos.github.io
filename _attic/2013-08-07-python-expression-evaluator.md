---
layout: post
title: Evaluating string expressions at runtime with Python 3
tags: [Python]
---

A few months ago, I wrote a
[blog post](http://bamos.github.io/2013/06/26/expression-parsing-shunting-yard/)
on expression parsing with Dijkstra's shunting yard algorithm in C++
to evaluate a string at runtime.
I've since also needed to use Python to evaluate an expression
at runtime.
[bamos/simple-python-scripts](https://github.com/bamos/simple-python-scripts)
contains a modified solution from a StackOverflow post.

# Background.
[This](http://stackoverflow.com/questions/2371436/evaluating-a-mathematical-expression-in-a-string)
StackOverflow post asks about evaluating arithmetic expressions.
Note all of the posts warning against using `eval()`,
as it can lead to arbitrary code execution.

[This](http://stackoverflow.com/a/9558001/1381755) answer
by J. Sebastian provides a good basis using the
[ast](http://docs.python.org/3.3/library/ast.html) module.
The ast module is used to parse a string into the Python abstract
syntax grammar. The ast is then recursively evaluated by using
only supported AST nodes and operations.

From this code, I wrapped the methods in a class, added support for a
variable map, added unary operators, and added all binary operators.

# Usage.
See below for my [unittest](http://docs.python.org/3.3/library/unittest.html)
code showing the usage of the program.

{% highlight python %}
#!/usr/bin/env python3
#
# EvalExprTest.py
# Tests for the EvalExpr.py module.

import unittest
from EvalExpr import EvalExpr

class EvalExprTest(unittest.TestCase):
  def testExpressions(self):
    varMap = {"pi": 3.14}
    e = EvalExpr(varMap)
    self.assertAlmostEqual(e.evalExpr("-pi+1"), -2.14)
    self.assertAlmostEqual(e.evalExpr("(20+10)*3/2-3"), 42.0)
    self.assertAlmostEqual(e.evalExpr("1 << 4"), 16.0)
    self.assertAlmostEqual(e.evalExpr("1+(-2*3)"), -5.0)

if __name__ == '__main__':
    unittest.main()
{% endhighlight %}

# Implementation.
{% highlight python %}
# EvalExpr.py
# A module to evaluate a mathematical expression using Python's AST.
#
# Original by: J. Sebastian at `http://stackoverflow.com/questions/2371436`
# Modifications by: Brandon Amos <http://bamos.github.io>

import ast
import operator as op

class EvalExpr:
  def __init__(self, varMap):
    self.ops = {ast.Add: op.add, ast.Sub: op.sub, ast.Mult: op.mul,
      ast.Div: op.truediv, ast.Mod: op.mod, ast.Pow: op.pow,
      ast.LShift: op.lshift, ast.RShift: op.rshift, ast.BitOr: op.or_,
      ast.BitXor: op.xor, ast.BitAnd: op.and_, ast.FloorDiv: op.floordiv,
      ast.Invert: op.invert, ast.Not: op.not_, ast.UAdd: op.pos, ast.USub: op.neg}
    self.varMap = varMap

  def evalExpr(self, expr):
    return self.__eval(ast.parse(expr).body[0].value)

  def __eval(self, node):
    if isinstance(node, ast.Num):
      return node.n
    elif type(node) in self.ops:
      return self.ops[type(node)]
    elif isinstance(node, ast.UnaryOp):
      return self.__eval(node.op)(self.__eval(node.operand))
    elif isinstance(node, ast.BinOp):
      return self.__eval(node.op)(self.__eval(node.left),
          self.__eval(node.right))
    elif node.id in self.varMap:
      return self.varMap[node.id]
    else:
      raise TypeError(node)
{% endhighlight %}
