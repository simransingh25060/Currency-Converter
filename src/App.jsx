import { useEffect, useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import usecurrencyinfo from './hooks/useCurrencyInfo'

function App() {

  const [amount,setamount] = useState()
  const[from,setfrom] = useState("usd")
  const[to,setto] = useState("inr")
  const[convertAmount,setconvertAmount] = useState("")


  const currencyinfo = usecurrencyinfo(from)
  const options = Object.keys(currencyinfo)

  const swap = () => {
    setfrom(to)
    setto(from)
    setconvertAmount(amount)
    setamount(convertAmount)
  }

  const convert = () =>{
    setconvertAmount(amount * currencyinfo[to])
  }
  

  return (
    <div 
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
      backgroundImage:  `url('https://ucarecdn.com/e3da0c57-c0b7-47af-aad6-77ae406d3f03/-/preview/1000x666/')`,
    }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-300 dark:border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30 dark:bg-black/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setamount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setamount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setto(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>


    
  
);
}

export default App
