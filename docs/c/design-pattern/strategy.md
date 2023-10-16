# Strategy

在软件构建过程中，某些对象使用的算法可能多种多样，经常改变，如果将这些算法都编码到对象中，将会使对下变得异常复杂，而有时候支持不适用的算法也是一种性能负担。

如何在运行时根据需要透明地更改对象的算法？将算法与对象本身解耦，从而避免上述问题？

<img :src="$withBase('/images/c/design-pattern/strategy.png')" alt="strategy">

> 定义一些列算法，把它们一个个封装起来，并且使它们可互相替换（变化）。该模式使得算法可独立于使用它的客户程序（稳定）而变换（扩展、子类化）。 ——来自《设计模式》GOF

## 总结

Strategy 及其子类为组件提供了一些列可重用的算法，从而使得类型在运行时方便地根据需要在各个算法之间进行切换。

Strategy 模式提供了用条件判断语句以外的另一种选择，消除判断语句，就是在解耦合。含有许多条件判断语句的代码通常都需要使用 Strtegy 模式。

如果 Strategy 对象没有实例变量，那么各个上下文可以共享同一个 Strtegy 对象，从而节省对下开销。（参考单例模式）

```cpp
class TaxStrategy {
  public:
    virtual double Calculate(const Context& context) =0;
    virtual ~TaxStrategy() {}
}

class CNTax : public TaxStrategy {
  public:
    virtual double Calculate(const Context& context) {

    }
}

class ENTax : public TaxStrategy {
  public:
    virtual double Calculate(const Context& context) {

    }
}

class ScalesOrder {
  private:
    TaxStrategy* strategy;

  public:
    ScalesOrder(StrategyFactory* strategyFactory) {
      this->strategy =  strategyFactory->NewStrategy(); // 参考工厂模式
    }
    ~ScalesOrder() {
      delete this->strategy;
    }

    double CalculateTax() {
      // ...
      Context context();
      double val = strategy->Calculate(context);
      // ...
    }
}
```

后续如果要新增处理策略，只需要继承 TaxStrategy 并实现对应的纯虚函数。
