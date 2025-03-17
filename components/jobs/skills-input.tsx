"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface SkillsInputProps {
  value: string[]
  onChange: (value: string[]) => void
}

export function SkillsInput({ value, onChange }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const handleAddSkill = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill))
  }

  // Common skills suggestions
  const suggestions = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "SQL",
    "AWS",
    "Docker",
    "Git",
  ]

  const filteredSuggestions = suggestions.filter((skill) => !value.includes(skill)).slice(0, 5)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill (e.g. JavaScript, React, etc.)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleAddSkill}>
          Add
        </Button>
      </div>

      {filteredSuggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => {
                  if (!value.includes(skill)) {
                    onChange([...value, skill])
                  }
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Selected skills:</p>
          <div className="flex flex-wrap gap-2">
            {value.map((skill) => (
              <Badge key={skill} className="flex items-center gap-1">
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill}</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

