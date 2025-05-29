"use client";
import { TreeNode } from "@/components/TreeNode";
import { Button } from "@/components/ui/button";
import JoditEditor from "jodit-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const initialSections = [
	{
		id: 1,
		title: "Introduction",
		parentId: null,
		children: [
			{
				id: 2,
				title: "Background",
				parentId: 1,
				children: [],
			},
			{
				id: 3,
				title: "Overview",
				parentId: 1,
				children: [],
			},
		],
	},
	{
		id: 4,
		title: "Main Content",
		parentId: null,
		children: [
			{
				id: 5,
				title: "Details",
				parentId: 4,
				children: [],
			},
		],
	},
];

type Section = {
	id: number;
	title: string;
	parentId: number | null;
	children: Section[];
	content?: string;
	gallery?: GalleryImage[];
};

type GalleryImage = {
	url: string;
	caption: string;
	file: File;
};

export default function Page() {
	// Article metadata
	const [articleName, setArticleName] = useState("");
	const [articleType, setArticleType] = useState("");
	// Content tree
	const [sections, setSections] = useState<Section[]>(initialSections);
	const [selectedSection, setSelectedSection] = useState<Section | null>(null);
	// Section editor
	const [sectionTitle, setSectionTitle] = useState("");
	const [sectionContent, setSectionContent] = useState("");
	const [gallery, setGallery] = useState<GalleryImage[]>([]);
	const editor = useRef(null);
	const fileInputRef = useRef<HTMLInputElement>(null);


	// Select section and load its data
	const handleSelectSection = (section: Section) => {
		setSelectedSection(section);
		setSectionTitle(section.title);
		setSectionContent(section.content || "");
		setGallery(section.gallery || []);
	};

	// Add section
	const handleAddSection = (parentId: number | null) => {
		const newId = Date.now();
		const newSection: Section = {
			id: newId,
			title: "New Section",
			parentId,
			children: [],
		};
		function addToTree(nodes: Section[]): Section[] {
			return nodes.map((node) => {
				if (node.id === parentId) {
					return { ...node, children: [...node.children, newSection] };
				} else if (node.children) {
					return { ...node, children: addToTree(node.children) };
				}
				return node;
			});
		}
		if (parentId == null) {
			setSections([...sections, newSection]);
		} else {
			setSections(addToTree(sections));
		}
	};

	// Delete section
	const handleDeleteSection = (id: number) => {
		function removeFromTree(nodes: Section[]): Section[] {
			return nodes
				.filter((node) => node.id !== id)
				.map((node) => ({
					...node,
					children: node.children ? removeFromTree(node.children) : [],
				}));
		}
		setSections(removeFromTree(sections));
		if (selectedSection && selectedSection.id === id) setSelectedSection(null);
	};

	// Save section edits
	const handleSaveSection = () => {
		if (!selectedSection) return;
		function updateTree(nodes: Section[]): Section[] {
			return nodes.map((node) => {
				if (selectedSection && node.id === selectedSection.id) {
					return {
						...node,
						title: sectionTitle,
						content: sectionContent,
						gallery,
					};
				} else if (node.children) {
					return { ...node, children: updateTree(node.children) };
				}
				return node;
			});
		}
		setSections(updateTree(sections));
	};

	// Image gallery upload
	const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const newImages: GalleryImage[] = files.map((file: File) => ({
			url: URL.createObjectURL(file),
			caption: "",
			file,
		}));
		setGallery([...gallery, ...newImages]);
	};

	// Update caption
	const handleCaptionChange = (idx: number, value: string) => {
		setGallery(
			gallery.map((img, i) => (i === idx ? { ...img, caption: value } : img))
		);
	};

	// Remove image
	const handleRemoveImage = (idx: number) => {
		setGallery(gallery.filter((_, i) => i !== idx));
	};

	return (
		<div className="min-h-screen p-5 mt-5 flex flex-col">
			{/* Top metadata section */}
			<div className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
				<div className="flex gap-4 items-center">
					<input
						type="text"
						className="border rounded px-3 py-2 text-lg min-w-[300px] bg-gray-50"
						placeholder="Article Name"
						value={articleName}
						onChange={(e) => setArticleName(e.target.value)}
					/>
					<select
						className="border rounded px-3 py-2 bg-gray-50"
						value={articleType}
						onChange={(e) => setArticleType(e.target.value)}
					>
						<option value="">Select Type</option>
						<option value="history">History</option>
						<option value="culture">Culture</option>
						<option value="art">Art</option>
						<option value="science">Science</option>
					</select>
				</div>
				<div className="flex gap-2">
					<Button className="bg-blue-600 text-white">Save</Button>
					<Button variant="outline">Cancel</Button>
				</div>
			</div>
			{/* Main 2-column layout */}
			<div className="flex-1 flex w-full max-w-[1600px] mx-auto py-8 gap-8">
				{/* Left: Content tree */}
				<aside className="w-1/3 min-w-[260px] max-w-[400px] bg-white border rounded-lg shadow-sm p-4 flex flex-col">
					<div className="flex justify-between items-center mb-2">
						<span className="font-semibold text-gray-700">
							Content Structure
						</span>
						<Button
							size="sm"
							onClick={() => handleAddSection(null)}
							className="bg-blue-50 text-blue-600"
						>
							+ Root
						</Button>
					</div>
					<div className="overflow-y-auto flex-1 pr-2">
						{sections.map((node) => (
							<TreeNode
								key={node.id}
								node={node}
								onSelect={handleSelectSection}
								selectedId={selectedSection?.id}
								onAdd={handleAddSection}
								onDelete={handleDeleteSection}
								onMove={() => {}}
							/>
						))}
					</div>
				</aside>
				{/* Right: Section editor */}
				<section className="flex-1 bg-white border rounded-lg shadow-sm p-6 flex flex-col min-w-0">
					{selectedSection ? (
						<>
							<div className="flex gap-4 items-center mb-4">
								<input
									type="text"
									className="border rounded px-3 py-2 text-base flex-1 bg-gray-50"
									placeholder="Section Title"
									value={sectionTitle}
									onChange={(e) => setSectionTitle(e.target.value)}
								/>
								<Button
									size="sm"
									onClick={handleSaveSection}
									className="bg-blue-600 text-white"
								>
									Save Section
								</Button>
							</div>
							<div className="flex-1 flex flex-col gap-4 min-h-[300px]">
								<JoditEditor
									ref={editor}
									value={sectionContent}
									onChange={setSectionContent}
									className="w-full h-full min-h-[200px]"
								/>
								{/* Image gallery */}
								<div>
									<div className="flex justify-between items-center mb-2">
										<span className="font-semibold text-gray-700">
											Image Gallery
										</span>
										<input
											type="file"
											multiple
											accept="image/*"
											className="hidden"
											ref={fileInputRef}
											onChange={handleGalleryChange}
										/>
										<Button
											size="sm"
											onClick={() => fileInputRef.current?.click()}
											className="bg-blue-50 text-blue-600"
										>
											Upload
										</Button>
									</div>
									<div className="flex flex-wrap gap-4">
										{gallery.map((img, idx) => (
											<div
												key={idx}
												className="border rounded-lg p-2 bg-gray-50 flex flex-col items-center w-40"
											>
												<Image
													src={img.url}
													alt=""
													className="w-full h-24 object-cover rounded mb-2"
												/>
												<input
													type="text"
													className="border rounded px-2 py-1 text-xs w-full mb-1"
													placeholder="Caption"
													value={img.caption}
													onChange={(e) =>
														handleCaptionChange(idx, e.target.value)
													}
												/>
												<Button
													size="sm"
													variant="destructive"
													onClick={() => handleRemoveImage(idx)}
												>
													Remove
												</Button>
											</div>
										))}
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="text-gray-400 flex-1 flex items-center justify-center">
							Select a section to edit
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
