// demos/cpp-payroll/payroll.cpp

#include <iostream>
using namespace std;

int main() {
    double hours;
    double rate;

    cout << "C++ Payroll Demo" << endl;
    cout << "Enter hours worked: ";
    cin >> hours;

    cout << "Enter hourly rate: ";
    cin >> rate;

    double grossPay = hours * rate;

    cout << "Gross Pay: $" << grossPay << endl;

    return 0;
}
