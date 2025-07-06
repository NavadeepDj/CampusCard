import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transactions } from '@/lib/data';
import { History, Receipt } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <History className="w-8 h-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold font-headline">Transaction History</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          {transactions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {transactions.map(transaction => (
                <AccordionItem value={transaction.id} key={transaction.id} className="px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-left">
                        <p className="font-semibold text-base">{transaction.vendorName}</p>
                        <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                      <p className="font-bold text-lg text-primary">${transaction.total.toFixed(2)}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-muted/50 -mx-6 px-6 py-4">
                      <h4 className="font-semibold mb-2 flex items-center"><Receipt className="w-4 h-4 mr-2"/>Receipt</h4>
                      <ul className="space-y-1">
                        {transaction.items.map((item, index) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t my-2"></div>
                       <div className="flex justify-between font-semibold text-sm">
                            <span>Total</span>
                            <span>${transaction.total.toFixed(2)}</span>
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>No transactions yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
