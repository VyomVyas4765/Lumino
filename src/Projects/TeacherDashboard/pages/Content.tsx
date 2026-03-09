import { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { useTeacher } from "../contexts/TeacherContext";

export default function TeacherContentPage() {
  const { lectures, addLecture, deleteLecture } = useTeacher();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("AI & ML");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [resources, setResources] = useState("");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Content Library</h1>
        <p className="text-slate-600 mt-1">Upload and organize your lectures, notes, and resource links.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold">Upload Lecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Lecture Title" value={title} onChange={setTitle} placeholder="e.g. Regression Essentials" />
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>AI & ML</option>
              <option>Programming</option>
              <option>Web Development</option>
              <option>Data Science</option>
            </select>
          </div>
          <Input label="Video URL" value={videoUrl} onChange={setVideoUrl} placeholder="https://www.youtube.com/embed/..." />
          <Input label="Resources (comma separated URLs)" value={resources} onChange={setResources} placeholder="https://... , https://..." />
        </div>

        <Input label="Description" value={description} onChange={setDescription} placeholder="What students will learn" />
        <div>
          <label className="block text-sm font-medium mb-1">Lecture Notes</label>
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-28"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write structured revision notes for students"
          />
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2.5 font-semibold hover:bg-emerald-700 transition"
          onClick={() => {
            if (!title.trim() || !videoUrl.trim() || !description.trim() || !notes.trim()) return;
            addLecture({
              title: title.trim(),
              subject,
              description: description.trim(),
              videoUrl: videoUrl.trim(),
              notes: notes.trim(),
              resources: resources
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            });
            setTitle("");
            setDescription("");
            setVideoUrl("");
            setNotes("");
            setResources("");
          }}
        >
          <Upload className="w-4 h-4" />
          Upload Lecture
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Your Uploaded Lectures</h2>
        {lectures.length === 0 ? (
          <p className="text-sm text-slate-500">No lectures uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{lecture.title}</p>
                    <p className="text-sm text-slate-500">{lecture.subject}</p>
                    <p className="text-sm mt-2 text-slate-700">{lecture.description}</p>
                  </div>
                  <button
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm hover:bg-slate-100"
                    onClick={() => deleteLecture(lecture.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
