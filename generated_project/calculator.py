```python
def add(x, y):
    """Adds two numbers."""
    return x + y

def subtract(x, y):
    """Subtracts two numbers."""
    return x - y

def multiply(x, y):
    """Multiplies two numbers."""
    return x * y

def divide(x, y):
    """Divides two numbers. Raises ZeroDivisionError if y is zero."""
    if y == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return x / y

def run_calculator():
    """Prompts the user for two numbers and an operation, then performs the operation."""

    try:
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        operation = input("Enter operation (+, -, *, /): ")

        if operation == "+":
            result = add(num1, num2)
        elif operation == "-":
            result = subtract(num1, num2)
        elif operation == "*":
            result = multiply(num1, num2)
        elif operation == "/":
            result = divide(num1, num2)
        else:
            print("Invalid operation.")
            return

        print("Result:", result)

    except ValueError:
        print("Invalid input. Please enter numbers only.")
    except ZeroDivisionError as e:
        print(e)

```