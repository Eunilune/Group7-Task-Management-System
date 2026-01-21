// utils/storage.js

const Storage = {
    KEYS: {
        PROJECTS: 'executask_projects',
        USERS: 'executask_users',
        HISTORY: 'executask_history'
    },

    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // ===========================
    //      HISTORY METHODS
    // ===========================

    getHistory() {
        let history = this.get(this.KEYS.HISTORY);
        // FIX: Initialize defaults if empty, so the widget shows something immediately
        if (!history) {
            history = this.initializeDefaultHistory();
        }
        return history;
    },

    // --- NEW: Dummy Data for History ---
    initializeDefaultHistory() {
        const defaults = [
            {
                id: 1,
                type: 'create',
                title: 'Website Redesign',
                description: 'Project created by Admin.',
                date: new Date().toISOString()
            },
            {
                id: 2,
                type: 'update',
                title: 'Mobile App Beta',
                description: 'Project details updated.',
                date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            },
            {
                id: 3,
                type: 'complete',
                title: 'Internal Audit',
                description: 'Project marked as Completed.',
                date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            }
        ];
        this.set(this.KEYS.HISTORY, defaults);
        return defaults;
    },

    logHistory(type, title, description) {
        const history = this.getHistory();
        const newLog = {
            id: Date.now(),
            type: type,
            title: title,
            description: description,
            date: new Date().toISOString()
        };
        history.push(newLog);
        this.set(this.KEYS.HISTORY, history);
    },

    // ===========================
    //      PROJECT METHODS
    // ===========================
    
    getProjects() {
        let projects = this.get(this.KEYS.PROJECTS);
        if (!projects) projects = this.initializeDefaultProjects();
        return projects;
    },

    addProject(project) {
        const projects = this.getProjects();
        projects.push(project);
        this.set(this.KEYS.PROJECTS, projects);
        this.logHistory('create', project.name, 'Project created by Admin.');
    },

    updateProject(updatedProject) {
        let projects = this.getProjects();
        const index = projects.findIndex(p => p.id == updatedProject.id);
        if (index !== -1) {
            const oldProject = projects[index];
            projects[index] = updatedProject;
            this.set(this.KEYS.PROJECTS, projects);

            if (updatedProject.status === 'Completed' && oldProject.status !== 'Completed') {
                this.logHistory('complete', updatedProject.name, 'Project marked as Completed.');
            } else {
                this.logHistory('update', updatedProject.name, 'Project details updated.');
            }
        }
    },

    deleteProject(id) {
        let projects = this.getProjects();
        const project = projects.find(p => p.id == id);
        if (project) {
            projects = projects.filter(p => p.id != id);
            this.set(this.KEYS.PROJECTS, projects);
            this.logHistory('delete', project.name, 'Project deleted from system.');
        }
    },

    initializeDefaultProjects() {
        const defaults = [
            { id: 1, name: "Website Redesign", status: "Active", desc: "Overhaul site.", startDate: "2026-01-10" }
        ];
        this.set(this.KEYS.PROJECTS, defaults);
        return defaults;
    },

    // ===========================
    //        USER METHODS
    // ===========================
    getUsers() {
        let users = this.get(this.KEYS.USERS);
        if (!users) users = this.initializeDefaultUsers();
        return users;
    },

    initializeDefaultUsers() {
        const defaults = [
            { id: "ADMIN001", name: "Admin User", email: "admin@executask.com", role: "Admin", status: "Active" }
        ];
        this.set(this.KEYS.USERS, defaults);
        return defaults;
    }
};