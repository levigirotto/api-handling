import ApiCard from "@/components/cards/ApiCard.tsx";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bibleBooks = [
  { key: "Genesis", name: "Genesis", chapters: 50 },
  { key: "Exodus", name: "Exodus", chapters: 40 },
  { key: "Leviticus", name: "Leviticus", chapters: 27 },
  { key: "Numbers", name: "Numbers", chapters: 36 },
  { key: "Deuteronomy", name: "Deuteronomy", chapters: 34 },
  { key: "Joshua", name: "Joshua", chapters: 24 },
  { key: "Judges", name: "Judges", chapters: 21 },
  { key: "Ruth", name: "Ruth", chapters: 4 },
  { key: "1Samuel", name: "I Samuel", chapters: 31 },
  { key: "2Samuel", name: "II Samuel", chapters: 24 },
  { key: "1Kings", name: "I Kings", chapters: 22 },
  { key: "2Kings", name: "II Kings", chapters: 25 },
  { key: "1Chronicles", name: "I Chronicles", chapters: 29 },
  { key: "2Chronicles", name: "II Chronicles", chapters: 36 },
  { key: "Ezra", name: "Ezra", chapters: 10 },
  { key: "Nehemiah", name: "Nehemiah", chapters: 13 },
  { key: "Esther", name: "Esther", chapters: 10 },
  { key: "Job", name: "Job", chapters: 42 },
  { key: "Psalms", name: "Psalms", chapters: 150 },
  { key: "Proverbs", name: "Proverbs", chapters: 31 },
  { key: "Ecclesiastes", name: "Ecclesiastes", chapters: 12 },
  { key: "SongOfSolomon", name: "Song of Solomon", chapters: 8 },
  { key: "Isaiah", name: "Isaiah", chapters: 66 },
  { key: "Jeremiah", name: "Jeremiah", chapters: 52 },
  { key: "Lamentations", name: "Lamentations", chapters: 5 },
  { key: "Ezekiel", name: "Ezekiel", chapters: 48 },
  { key: "Daniel", name: "Daniel", chapters: 12 },
  { key: "Hosea", name: "Hosea", chapters: 14 },
  { key: "Joel", name: "Joel", chapters: 3 },
  { key: "Amos", name: "Amos", chapters: 9 },
  { key: "Obadiah", name: "Obadiah", chapters: 1 },
  { key: "Jonah", name: "Jonah", chapters: 4 },
  { key: "Micah", name: "Micah", chapters: 7 },
  { key: "Nahum", name: "Nahum", chapters: 3 },
  { key: "Habakkuk", name: "Habakkuk", chapters: 3 },
  { key: "Zephaniah", name: "Zephaniah", chapters: 3 },
  { key: "Haggai", name: "Haggai", chapters: 2 },
  { key: "Zechariah", name: "Zechariah", chapters: 14 },
  { key: "Malachi", name: "Malachi", chapters: 4 },
  { key: "Matthew", name: "Matthew", chapters: 28 },
  { key: "Mark", name: "Mark", chapters: 16 },
  { key: "Luke", name: "Luke", chapters: 24 },
  { key: "John", name: "John", chapters: 21 },
  { key: "Acts", name: "Acts", chapters: 28 },
  { key: "Romans", name: "Romans", chapters: 16 },
  { key: "1Corinthians", name: "I Corinthians", chapters: 16 },
  { key: "2Corinthians", name: "II Corinthians", chapters: 13 },
  { key: "Galatians", name: "Galatians", chapters: 6 },
  { key: "Ephesians", name: "Ephesians", chapters: 6 },
  { key: "Philippians", name: "Philippians", chapters: 4 },
  { key: "Colossians", name: "Colossians", chapters: 4 },
  { key: "1Thessalonians", name: "I Thessalonians", chapters: 5 },
  { key: "2Thessalonians", name: "II Thessalonians", chapters: 3 },
  { key: "1Timothy", name: "I Timothy", chapters: 6 },
  { key: "2Timothy", name: "II Timothy", chapters: 4 },
  { key: "Titus", name: "Titus", chapters: 3 },
  { key: "Philemon", name: "Philemon", chapters: 1 },
  { key: "Hebrews", name: "Hebrews", chapters: 13 },
  { key: "James", name: "James", chapters: 5 },
  { key: "1Peter", name: "I Peter", chapters: 5 },
  { key: "2Peter", name: "II Peter", chapters: 3 },
  { key: "1John", name: "I John", chapters: 5 },
  { key: "2John", name: "II John", chapters: 1 },
  { key: "3John", name: "III John", chapters: 1 },
  { key: "Jude", name: "Jude", chapters: 1 },
  { key: "Revelation", name: "Revelation", chapters: 22 }
];

export default function BibleCard() {
    const [book, setBook] = useState("");
    const [chapterAmount, setChapterAmount] = useState(0);
    const [verseAmount, setVerseAmount] = useState(0);
    const [chapter, setChapter] = useState("");
    const [verse, setVerse] = useState("");
    const [content, setContent] = useState("");

    async function fetch() {
        try {
            const res = await axios.get(`https://bible-api.com/${book}+${chapter}:${verse}?translation=kjv`);
            const data = res.data.verses[0].text;
            setContent(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setChapter("");
        setVerse("");
        setContent("");
    }, [book]);

    useEffect(() => {
        setVerse("");
        setContent("");
    }, [chapter])

    useEffect(() => {
        fetch();
    }, [verse])

    return <ApiCard 
        title="Bible verses"
        description="bible-api.com"
        apiLink="https://bible-api.com/"
        content={
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 gap-2">
                    <Select
                        onValueChange={(selectedKey) => {
                            setBook(selectedKey);
                            const selectedBook = bibleBooks.find(b => b.key === selectedKey);
                            setChapterAmount(selectedBook!.chapters);
                        }}
                        value={book}
                    >
                        <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Book" />
                        </SelectTrigger>
                        <SelectContent>
                            {bibleBooks.map((book) => {
                                return (
                                    <SelectItem value={book.key}>
                                        <span>{book.name}</span>
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>

                    <Select 
                        onValueChange={async (chapterNumber) => {
                            setChapter(chapterNumber);
                            try {
                                const res = await axios.get(`https://bible-api.com/${book}+${chapterNumber}?translation=kjv`);
                                setVerseAmount(res.data.verses.length);
                            } catch (err) {
                                console.log(err);
                            }
                        }} 
                        value={chapter}
                    >
                        <SelectTrigger disabled={!chapterAmount}>
                            <SelectValue placeholder="Chapter" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: chapterAmount }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>
                                    <span>{i + 1}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <Select onValueChange={setVerse} value={verse}>
                        <SelectTrigger disabled={!verseAmount}>
                            <SelectValue placeholder="Verse" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: verseAmount }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>
                                    <span>{i + 1}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Textarea 
                    value={content}
                    readOnly
                    rows={6}
                    className={`bg-stone-800 text-yellow-100 w-full max-w-md p-2 ${content === "" ? "hidden" : ""}`}
                />
            </div>
        }
    />
}