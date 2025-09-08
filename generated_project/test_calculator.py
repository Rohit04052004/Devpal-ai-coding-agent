import unittest
from unittest.mock import patch
from io import StringIO
from calculator import add, subtract, multiply, divide, run_calculator

class TestCalculator(unittest.TestCase):

    def test_arithmetic_functions(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)

        self.assertEqual(subtract(5, 2), 3)
        self.assertEqual(subtract(1, -1), 2)
        self.assertEqual(subtract(0, 0), 0)

        self.assertEqual(multiply(2, 3), 6)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(0, 5), 0)

        self.assertEqual(divide(6, 2), 3)
        self.assertEqual(divide(1, -1), -1)
        with self.assertRaises(ZeroDivisionError):
            divide(5, 0)

    @patch('builtins.input', side_effect=['1', '2', '3'])
    @patch('sys.stdout', new_callable=StringIO)
    def test_run_calculator_add(self, mock_stdout, mock_input):
        run_calculator()
        self.assertEqual(mock_stdout.getvalue().strip(), '5')

    @patch('builtins.input', side_effect=['2', '5', '2'])
    @patch('sys.stdout', new_callable=StringIO)
    def test_run_calculator_subtract(self, mock_stdout, mock_input):
        run_calculator()
        self.assertEqual(mock_stdout.getvalue().strip(), '3')

    @patch('builtins.input', side_effect=['3', '2', '3'])
    @patch('sys.stdout', new_callable=StringIO)
    def test_run_calculator_multiply(self, mock_stdout, mock_input):
        run_calculator()
        self.assertEqual(mock_stdout.getvalue().strip(), '6')

    @patch('builtins.input', side_effect=['4', '6', '2'])
    @patch('sys.stdout', new_callable=StringIO)
    def test_run_calculator_divide(self, mock_stdout, mock_input):
        run_calculator()
        self.assertEqual(mock_stdout.getvalue().strip(), '3')

if __name__ == '__main__':
    unittest.main()