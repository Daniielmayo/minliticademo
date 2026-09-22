---
name: git-and-commits
description: Defines Git commit standards and conventional commit message rules for the Minlitica Frontend repository. Use this skill whenever staging changes, reviewing git diffs, writing PR descriptions, or generating commit messages.
---

# Git & Conventional Commit Standards

## Purpose

This document establishes the official standards for Git workflow and commit messages in `minlitica-frontend`.
The goal is to maintain a readable, automated, and clean Git history compatible with semantic versioning and changelog generators.

---

## Commit Message Format

Every commit message MUST follow the Conventional Commits specification:

```text
<type>(<scope>): <short summary in imperative mood>

[optional body describing what changed and why]
