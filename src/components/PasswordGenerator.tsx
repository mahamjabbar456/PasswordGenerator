'use client'; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState,ChangeEvent } from "react";

// Import custom UI components from the UI directory
import { Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
 } from "./ui/card";
 import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { Checkbox,CheckedState } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

const PasswordGenerator = () => {
    // State hooks for managing password generation options and the generated password
    const [length,setLength] = useState<number>(16);
    const [includeUpperCase,setIncludeUpperCase] = useState<boolean>(true);
    const [includeLowerCase,setIncludeLowerCase] = useState<boolean>(true);
    const [includeNumber,setIncludeNumber] = useState<boolean>(true);
    const [includeSymbol,setIncludeSymbol] = useState<boolean>(true);
    const [password,setPassword] = useState<string>("");

      // Handler for updating the length state on input change
    const handleLengthChange = (e : ChangeEvent<HTMLInputElement>) : void => {
      setLength(Number(e.target.value));
    }

      // Handler for updating the checkbox states
     const handleCheckboxChange = (setter : (value:boolean) => void) => 
     (checked : CheckedState) : void =>{
      if(typeof checked === 'boolean'){
        setter(checked)
      }
     }

     const copyToClipBoard = () : void =>{
      navigator.clipboard.writeText(password).then(
        ()=>{
          alert("Password copied to clipboard")
        },(err) =>{
          alert("Failed to copy password to clipboard.");
        }
      )
     }
       // Function to generate a password based on selected options
     const generatePassword = ():void =>{
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_-+=[]{}:;<>?/,.";

        let allChars = "";
        if(includeUpperCase)  allChars += uppercaseChars;
        if(includeLowerCase)  allChars += lowercaseChars;
        if(includeNumber)       allChars += numberChars;
        if(includeSymbol)       allChars += symbolChars;

        if(allChars === ""){
          alert("Please select at least one character type.");
          return;
        }

        let generatedPassword = "";
        for(let i =0;i<length;i++){
          const randomIndex = Math.floor(Math.random()* allChars.length);
          generatedPassword += allChars[randomIndex];
        }
        setPassword(generatedPassword);
     }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Center the password generator card within the screen */}
      <Card className="pt-6 max-w-md w-full shadow-lg rounded-xl">
        <div className="space-y-6">
        {/* Header with title and description */}
        <CardHeader className="space-y-2 flex items-center p-0">
          <CardTitle className="text-3xl font-bold">Password Generator</CardTitle>
          <CardDescription className="text-md">
          Create a secure password with just a few clicks.
          </CardDescription>
        </CardHeader>
          {/* Main content area for password options and input */}
          <CardContent className="space-y-4">
              {/* Input for password length */}
              <div className="space-y-2">
                 <Label htmlFor="length" className="font-bold">Password Length</Label>
                 <Input
                 id="length"
                 type="number"
                 min="8"
                 max="32"
                 value={length}
                 onChange={handleLengthChange}
                 className="rounded-2xl w-full"
                 />
              </div>
              {/* Checkboxes for character type inclusion */}
              <div className="space-y-2">
                <Label className="font-bold">
                  Include:
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                  id="uppercase"
                  checked={includeUpperCase}
                  onCheckedChange={handleCheckboxChange(setIncludeUpperCase)}
                  className="rounded-xl"
                  />
                  <Label htmlFor="uppercase" className="font-bold">Uppercase Letters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                  id="lowercase"
                  checked={includeLowerCase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowerCase)}
                  className="rounded-xl"
                  />
                  <Label htmlFor="lowercase" className="font-bold">LowerCase Letters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                  id="number"
                  checked = {includeNumber}
                  onCheckedChange={handleCheckboxChange(setIncludeNumber)}
                  className="rounded-xl"
                  />
                  <Label htmlFor="number" className="font-bold">Numbers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                  id="symbol"
                  checked={includeSymbol}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbol)}
                  className="rounded-xl"
                  />
                  <Label htmlFor="symbol" className="font-bold">Symbols</Label>
                </div>
              </div>
                {/* Button to generate password */}
                <Button type="button" className="w-full rounded-2xl font-bold" onClick={generatePassword}>
                  Generate Password
                </Button>
                {/* Display the generated password and button to copy */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-bold">Generated Password</Label>
                  <div className="flex items-center justify-center gap-2">
                    <Input
                    type="text"
                    id="password"
                    value={password}
                    readOnly
                    className="rounded-2xl flex-1 hover:border-black"
                    />
                    <Button
                    type="button"
                    className="rounded-2xl"
                    onClick={copyToClipBoard}
                    >Copy To Clipboard</Button>
                  </div>
                </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default PasswordGenerator
