import { cn } from "./lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { v4 as uuid } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { PackageJson } from "./types";
import { RepositoryItem } from "./RepoItem";

function App() {
  interface Message {
    type: 'user' | 'bot';
    content: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [packageJsonFiles, setPackageJsonFiles] = useState<PackageJson[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  useEffect(() => {
    const storedFiles = localStorage.getItem('packageJsonFiles');
    if (storedFiles) {
      const parsedFiles = JSON.parse(storedFiles);
      setPackageJsonFiles(parsedFiles);
      if (parsedFiles.length > 0 && !selectedPackageId) {
        setSelectedPackageId(parsedFiles[0].id);
      }
    }
  }, [selectedPackageId]);

  useEffect(() => {
    const storedFiles = localStorage.getItem('packageJsonFiles');
    if (storedFiles) {
      setPackageJsonFiles(JSON.parse(storedFiles));
    }
  }, []);

  const onSubmit = async (data: { message: string }) => {
    const userMessage: Message = { type: "user", content: data.message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      const selectedPackage = packageJsonFiles.find(file => file.id === selectedPackageId);
      const packageContent = selectedPackage ? JSON.parse(selectedPackage.content) : null;
      
      const response = await fetch("https://ng46ez.buildship.run/claude-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: data.message,
          context: {
            packageName: packageContent?.name,
            dependencies: packageContent?.dependencies,
            devDependencies: packageContent?.devDependencies
          }
        })
      });
  
      const responseData = await response.json();
      console.log(responseData)
  
      const botMessage: Message = { 
        type: "bot", 
        content: responseData.message
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  
    reset();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const parsedContent = JSON.parse(content);

          const newFile: PackageJson = { 
            id: uuid(),
            filename: file.name, 
            name: parsedContent.name, 
            content 
          };
          setPackageJsonFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, newFile];
            localStorage.setItem('packageJsonFiles', JSON.stringify(updatedFiles));
            return updatedFiles;
          });
        } catch (error) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const deleteFile = (id: string) => {
    setPackageJsonFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);
      localStorage.setItem('packageJsonFiles', JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  async function shareImpacts() {
    const shareData = {
      title: "Impacts",
      text: "Discover the climate impact and sustainability of your project with Impacts, an AI tool that analyses codebases for environmental insights.",
      url: "https://impacts.fyi",
    };
    
    await navigator.share(shareData);
  }

  return (
    <div className="flex flex-col w-full">
      <header className="w-full bg-background/80 backdrop-blur-md h-[50px] flex flex-row items-center border-b border-muted-foreground/20 sticky top-0">
        <div className="flex flex-row w-full items-center justify-between mx-4">
          <div className="flex flex-row gap-3 items-center">
            <div className="h-[30px] w-[30px] rounded-md bg-green-600 flex justify-center items-center">
              <svg height="18px" viewBox="0 0 134 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0C50.2667 0 69.5533 17.0267 73.0867 39.3C80.92 31.4933 91.7333 26.6667 103.667 26.6667H133.667V43.3333C133.667 67.2667 114.267 86.6667 90.3333 86.6667H73.6667V120H60.3333V66.6667H47C21.2267 66.6667 0.333344 45.7733 0.333344 20V0H27ZM120.333 40H103.667C87.1 40 73.6667 53.4333 73.6667 70V73.3333H90.3333C106.9 73.3333 120.333 59.9 120.333 43.3333V40ZM27 13.3333H13.6667V20C13.6667 38.4067 28.5933 53.3333 47 53.3333H60.3333V46.6667C60.3333 28.26 45.4067 13.3333 27 13.3333Z" fill="white"/>
              </svg>
            </div>

            <span className="text-sm font-semibold">Impacts</span>
          </div>

          <div className="flex flex-row gap-3">
            <Dialog>
              <DialogTrigger>
                <Button size="sm" className="text-xs rounded-sm" variant="outline">
                  <i className="ri-pages-line text-[16px]"></i>
                  <span className="font-medium tracking-tight">Resources</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Resources</DialogTitle>
                  <DialogDescription className="pt-1">
                    We've included some additional environmental impact assessment tools, best practices and guidelines and other resources for your convenience.
                  </DialogDescription>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <Button variant="outline" className="text-sm">Green Algorithms</Button>
                    <Button variant="outline" className="text-sm">ML CO2 Impact</Button>
                    <Button variant="outline" className="text-sm">AI Ethics Principles</Button>
                    <Button variant="outline" className="text-sm">How Sustainable Is My AI?</Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button variant="secondary" size="sm" className="text-xs rounded-sm">
                <i className="ri-upload-2-line text-[16px]"></i>
                <span className="font-medium tracking-tight">Import</span>
              </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import</DialogTitle>
                  <DialogDescription className="pt-1">
                    You can import a local repository or import a repo from GitHub by providing the URL.
                  </DialogDescription>
                  <Input type="file" accept=".json" onChange={handleFileUpload} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex flex-row px-0 flex-1">
        <aside className="h-full border-r flex flex-col flex-1 min-w-[250px] max-w-[300px] min-h-full">
          <div className="flex flex-1  h-full w-full flex-col p-4">
            <div className="flex flex-col gap-2 text-muted-foreground flex-1">
              {packageJsonFiles.map((file) => (
                <RepositoryItem 
                  key={file.id} 
                  file={file} 
                  onDelete={deleteFile}
                  isSelected={file.id === selectedPackageId}
                  onSelect={() => setSelectedPackageId(file.id)}
                />
              ))}
              <div className="flex-1"></div>
              <div>
                <Button 
                  variant="outline" size="sm" className="w-full"
                  onClick={shareImpacts}
                >
                  <i className="ri-share-2-line text-[16px]"></i>
                  <span className="font-medium tracking-tight">Share Impacts</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[55px] w-full border-t px-4 flex items-center justify-center gap-3">
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" size="sm" className="text-muted-foreground">
                  <i className="ri-information-2-line text-[16px]"></i>  
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Information</DialogTitle>
                  <DialogDescription className="pt-3 flex flex-col gap-2 text-sm pb-3">
                    <span className="mr-10">
                      This project was developed by Ben Jackson and Lachlan Hawthorne for the 2024 SXSW Sydney BuildClub x National AI Centre (NAIC) Hackathon.
                    </span>

                    <span className="mr-10">
                    This tool runs entirely in your browser or desktop application, ensuring security and ease of use. It operates in isolation, preventing data sharing between browser sessions or tabs for enhanced privacy.
                    </span>

                    <span className="mr-10">
                      If you are interested in contributing to this project, please open an issue on the GitHub repository.
                    </span>
                  </DialogDescription>

                  <Button variant="outline" className="mt-4">
                    <i className="ri-github-line text-[16px]"></i>
                    <span className="font-medium tracking-tight text-sm">impactsfyi/impacts</span>
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger className="flex-1 flex">
                <Button variant="outline" className="flex-1 text-muted-foreground" size="sm">
                  <i className="ri-settings-4-line text-[16px]"></i>
                  <span className="tracking-tight">Settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription className="pt-2 flex flex-col gap-2 text-sm pb-3">
                  </DialogDescription>

                  <div className="flex flex-row gap-2">
                    <Button variant="outline" className="flex-1">
                      <span className="font-medium tracking-tight text-xs">Cancel</span>
                    </Button>

                    <div className="flex-1"></div>

                    <Button variant="outline" className="flex-1">
                      <i className="ri-close-circle-line text-[16px]"></i>
                      <span className="font-medium tracking-tight text-xs">Reset</span>
                    </Button>

                    <Button variant="secondary" className="flex-1">
                      <i className="ri-save-line text-[16px]"></i>
                      <span className="font-medium tracking-tight text-xs">Save</span>
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </aside>

        <div className="flex flex-col justify-center items-center h-full flex-1 w-full bg-muted-foreground/5">
          {messages.length > 0 && (
            <div className="w-full max-w-[700px] flex flex-col flex-1">
              <div className="flex-1"></div>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 ${message.type === "user" ? "text-right" : "text-left"}`}
                >
                  <div className={`inline-block px-4 py-2 border rounded-lg text-sm ${message.type === "user" ? "bg-background text-white rounded-br-none ml-14" : "bg-gray-200 text-black mr-14"}`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div 
            className={cn("w-full h-[400px] max-w-[700px] flex-1 flex flex-col justify-center items-center gap-4 transition-opacity", messages.length > 0 ? "opacity-0 absolute" : "opacity-100 relative")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1 bg-background">
                <div className="bg-orange-600/15 text-orange-600 h-10 w-10 text-lg flex justify-center items-center rounded-md mb-2">
                  <i className="ri-calculator-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Impact Calculation</h2>
                <p className="text-sm text-muted-foreground">Detailed analysis of your AI project's environmental footprint.</p>
              </div>

              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1 bg-background">
                <div className="bg-green-600/15 text-green-600 h-10 w-10 text-lg flex justify-center items-center rounded-md mb-2">
                  <i className="ri-artboard-2-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Design Recommendations</h2>
                <p className="text-sm text-muted-foreground">Actionable steps to minimize environmental impact during development.</p>
              </div>

              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1 bg-background">
                <div className="bg-yellow-600/15 text-yellow-600 h-10 w-10 text-lg flex justify-center items-center rounded-md mb-2">
                  <i className="ri-star-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Rating System</h2>
                <p className="text-sm text-muted-foreground">Evaluate and compare the climate impact of different AI solutions.</p>
              </div>

              <div className="feature-card p-6 border rounded-xl flex flex-col gap-1 bg-background">
                <div className="bg-blue-600/15 text-blue-600 h-10 w-10 text-lg flex justify-center items-center rounded-md mb-2">
                  <i className="ri-checkbox-circle-line text-2xl"></i>
                </div>
                <h2 className="text-md font-semibold tracking-tight">Industry Standards</h2>
                <p className="text-sm text-muted-foreground">Evaluate and compare the climate impact of different AI solutions.</p>
              </div>    

            </div>

            <div className="border bg-background/40 flex w-full rounded-md p-4 flex-col gap-2 text-xs text-center text-muted-foreground">
              <i className="ri-drag-drop-line text-lg"></i>
              <span className="text-xs">Drag and drop your repo into the chat to quickly get started.</span>
            </div>

          </div>

          <footer className="w-full bg-background/80 backdrop-blur-md h-[55px] flex flex-row items-center justify-center border-t border-muted-foreground/20 sticky bottom-0">
            <form onSubmit={handleSubmit(onSubmit as any)} className="flex flex-row w-full mx-3 max-w-[700px] flex-1 gap-3">
              <Input
                {...register("message", { required: true })}
                placeholder="Message AI or search repo"
                className="text-xs"
              />
              <Button type="submit" size="sm" className="px-10" variant="secondary">
                Send
              </Button>
            </form>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;