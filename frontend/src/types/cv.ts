export interface CV {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    avatarUrl?: string;
    jobTitle?: string;
    careerObjective?: string;
    profileSummary?: string;
    experience?: string;
    education?: string;
    skills?: string;
    certifications?: string;
    projects?: string;
    languages?: string;
    linkedIn?: string;
    github?: string;
    websiteUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CVResponse {
    data: CV;
}