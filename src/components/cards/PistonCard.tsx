import { Button } from "@/components/ui/button";
import ApiCard from "@/components/cards/ApiCard.tsx"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Runtime = {
    language: string;
    version: string;
  }

export default function PistonCard() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [pistonRuntimes, setPistonRuntimes] = useState<Runtime[]>([]);
  const [version, setVersion] = useState("3.10.0");
  const [placeholder, setPlaceholder] = useState("print('Hello, World!')")

  async function updateRuntimes() {
    try {
      const response = await axios.get("https://emkc.org/api/v2/piston/runtimes")
      setPistonRuntimes(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    updateRuntimes();
    const runtime = pistonRuntimes.find((r: Runtime) => r.language.toLowerCase() === language.toLowerCase());
    runtime ? setVersion(runtime.version) : console.log("Unable to get current language version.")
    setCode("");
    setOutput("");

    switch (language) {
      case "python":
        setPlaceholder("print('Hello, World!')");
        break;
      case "javascript":
        setPlaceholder("console.log('Hello, World!')");
        break;
      case "c":
        setPlaceholder(`int main() {printf("Hello, World!"); return 0;}`)
        break;
    }
  }, [language]);

  const handleSubmit = async () => {
    try {
        const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
              language: language,
              version: version,
              files: [{content: code}]
            }
        );
        setOutput(response.data.run.output);
    } catch (error) {
        setOutput("Error executing code.");
        console.error(error);
    }
};

  return (
    <ApiCard
      title="Programming"
      description="Piston API"
      apiLink="https://piston.readthedocs.io/en/latest/api-v2/"
      content={
        <div className="grid grid-cols-2 gap-2">
            <h2 className="col-span-2 font-semibold py-2">Code</h2>
            <Textarea
                rows={3}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={"e.g., " + placeholder}
                className="col-span-2 font-mono bg-zinc-950"
            />
            <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="python">
                      <div className="flex items-center space-x-2">
                        <img
                          className="w-4 h-4"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
                          alt="Python"
                        />
                        <span>Python</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="javascript">
                      <div className="flex items-center space-x-2">
                        <img
                          className="w-4 h-4"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                          alt="JavaScript"
                        />
                        <span>JavaScript</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="c">
                      <div className="flex items-center space-x-2">
                        <img
                          className="w-4 h-4"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png"
                          alt="C"
                        />
                        <span>C</span>
                      </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleSubmit}>Submit</Button>
            <h2 className="col-span-2 font-semibold py-2">Output</h2>
            <Textarea
              className="font-mono bg-zinc-950 col-span-2"
              readOnly
              value={output}
              rows={5}
            />
        </div>
      }
    />
  );
}