import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import React from 'react';
import Heading from './ui/heading';

const LeavePolicy = () => {
  const [activeTab, setActiveTab] = useState("quotas");
  
  return (
    <div>
      <Heading variant="h2" color="primary" className="mb-6">
        Leave Policy
      </Heading>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quotas">Leave Quotas</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quotas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Annual Leave Quotas</CardTitle>
              <CardDescription>
                Below are the leave entitlements for all employees at Srinistha Technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-company-50 text-left">
                      <th className="p-4 border-b border-company-200">Leave Type</th>
                      <th className="p-4 border-b border-company-200">Entitlement (Days)</th>
                      <th className="p-4 border-b border-company-200">Carry Forward</th>
                      <th className="p-4 border-b border-company-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-company-100 font-medium">Casual Leave</td>
                      <td className="p-4 border-b border-company-100">12</td>
                      <td className="p-4 border-b border-company-100">Not Allowed</td>
                      <td className="p-4 border-b border-company-100">Can be taken for personal matters</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 border-b border-company-100 font-medium">Sick Leave</td>
                      <td className="p-4 border-b border-company-100">10</td>
                      <td className="p-4 border-b border-company-100">Not Allowed</td>
                      <td className="p-4 border-b border-company-100">Medical certificate required for 3+ consecutive days</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-company-100 font-medium">Earned Leave</td>
                      <td className="p-4 border-b border-company-100">15</td>
                      <td className="p-4 border-b border-company-100">Max 10 days</td>
                      <td className="p-4 border-b border-company-100">Accumulates based on service period</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 border-b border-company-100 font-medium">Maternity Leave</td>
                      <td className="p-4 border-b border-company-100">180</td>
                      <td className="p-4 border-b border-company-100">Not Applicable</td>
                      <td className="p-4 border-b border-company-100">For female employees only</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-company-100 font-medium">Paternity Leave</td>
                      <td className="p-4 border-b border-company-100">15</td>
                      <td className="p-4 border-b border-company-100">Not Applicable</td>
                      <td className="p-4 border-b border-company-100">For male employees only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="eligibility" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Eligibility</CardTitle>
              <CardDescription>
                Requirements for being eligible for different types of leave
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-company-700">
                    Probation Period Employees
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Entitled to sick leave from day one</li>
                      <li>Casual leave is prorated based on joining date</li>
                      <li>Not eligible for earned leave during probation</li>
                      <li>Maternity and paternity leave available after 3 months of service</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-company-700">
                    Permanent Employees
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Eligible for all types of leave as per policy</li>
                      <li>Earned leave accumulates at 1.25 days per month</li>
                      <li>Can avail leave encashment for unused earned leave</li>
                      <li>Option to combine different types of leave with prior approval</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-company-700">
                    Contract Employees
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Leave entitlement as specified in contract</li>
                      <li>Generally eligible for casual and sick leave only</li>
                      <li>No carry forward of leave to next contract period</li>
                      <li>Maternity/paternity leave as per statutory requirements</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Rules & Guidelines</CardTitle>
              <CardDescription>
                Important rules and procedures for leave application and approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-company-600 pl-4 py-2">
                <h3 className="font-semibold text-lg">Application Timeline</h3>
                <p className="text-gray-600">
                  All planned leaves must be applied at least 7 days in advance, except for emergencies.
                  Short notice applications may be rejected based on business requirements.
                </p>
              </div>
              
              <div className="border-l-4 border-company-600 pl-4 py-2">
                <h3 className="font-semibold text-lg">Approval Process</h3>
                <p className="text-gray-600">
                  Leaves require approval from immediate manager and department head.
                  For leaves exceeding 5 working days, additional approval from HR is required.
                </p>
              </div>
              
              <div className="border-l-4 border-company-600 pl-4 py-2">
                <h3 className="font-semibold text-lg">Cancellation Policy</h3>
                <p className="text-gray-600">
                  Approved leaves can be cancelled by the employee with at least 2 days notice.
                  Management may recall employees on leave during critical business situations.
                </p>
              </div>
              
              <div className="border-l-4 border-company-600 pl-4 py-2">
                <h3 className="font-semibold text-lg">Extension Requests</h3>
                <p className="text-gray-600">
                  Extension of ongoing leave requires formal application and approval.
                  Unapproved extensions may be treated as unauthorized absence.
                </p>
              </div>
              
              <div className="border-l-4 border-company-600 pl-4 py-2">
                <h3 className="font-semibold text-lg">Holiday & Weekend Policy</h3>
                <p className="text-gray-600">
                  Official holidays and weekends between leave periods are not counted as leave.
                  Leaves adjoining holidays require prior approval from department head.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeavePolicy;