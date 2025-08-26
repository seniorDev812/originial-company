
"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Tabs,
  Card,
  Text,
  Badge,
  Group,
  Button,
  Modal,
  Stack,
  Grid,
  ActionIcon,
  Tooltip,
  Alert,
  LoadingOverlay,
  Pagination,
  Box,
  Divider,
  Paper,
  ThemeIcon,
  SimpleGrid,
  ScrollArea,
  Table,
  Avatar,
  Menu,
  Switch,
  TextInput,
  Select,
  Textarea,
  Chip
} from '@mantine/core';
import {
  IconBriefcase,
  IconUsers,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconDownload,
  IconMail,
  IconPhone,
  IconCalendar,
  IconMapPin,
  IconBuilding,
  IconClock,
  IconCurrencyDollar,
  IconFileText,
  IconCheck,
  IconX,
  IconSearch,
  IconFilter,
  IconRefresh,
  IconChartBar,
  IconUserCheck,
  IconUserX,
  IconFileDescription,
  IconStar
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  responsibilities: string;
  postedDate: string;
  skills: string[];
  benefits: string[];
  isActive: boolean;
  applicationsCount: number;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  message?: string;
  resumeName: string;
  resumeSize: number;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  jobId?: number;
  jobTitle?: string;
}

export default function CareerManagement() {
  const [activeTab, setActiveTab] = useState<string | null>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applicationsPage, setApplicationsPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Job CRUD states
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    skills: [] as string[],
    benefits: [] as string[]
  });
  // Job details modal
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [jobToView, setJobToView] = useState<Job | null>(null);
  // Delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const itemsPerPage = 10;

  // Mock data
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: 1,
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$120,000 - $150,000",
        description: "We are looking for a Senior Software Engineer to join our team.",
        requirements: "5+ years of experience in software development.",
        responsibilities: "Lead technical projects, mentor junior developers.",
        postedDate: "2024-01-15",
        skills: ["JavaScript", "Python", "React", "Node.js", "AWS"],
        benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
        isActive: true,
        applicationsCount: 12
      },
      {
        id: 2,
        title: "Product Manager",
        department: "Product",
        location: "New York",
        type: "Full-time",
        salary: "$100,000 - $130,000",
        description: "Join our product team to drive the development of cutting-edge solutions.",
        requirements: "3+ years of product management experience.",
        responsibilities: "Define product strategy, work with engineering teams.",
        postedDate: "2024-01-10",
        skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
        benefits: ["Health Insurance", "401k", "Stock Options", "Professional Development"],
        isActive: true,
        applicationsCount: 8
      }
    ];

    const mockApplications: Application[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        position: "Senior Software Engineer",
        message: "I'm excited about this opportunity and believe my experience aligns perfectly.",
        resumeName: "john_doe_resume.pdf",
        resumeSize: 245760,
        submittedAt: "2024-01-20T10:30:00Z",
        status: "pending",
        jobId: 1,
        jobTitle: "Senior Software Engineer"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        position: "Product Manager",
        message: "I have extensive experience in product management.",
        resumeName: "jane_smith_cv.pdf",
        resumeSize: 189440,
        submittedAt: "2024-01-19T14:15:00Z",
        status: "reviewed",
        jobId: 2,
        jobTitle: "Product Manager"
      }
    ];

    setJobs(mockJobs);
    setApplications(mockApplications);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'reviewed': return 'blue';
      case 'shortlisted': return 'green';
      case 'rejected': return 'red';
      case 'hired': return 'teal';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <IconClock size={16} />;
      case 'reviewed': return <IconEye size={16} />;
      case 'shortlisted': return <IconStar size={16} />;
      case 'rejected': return <IconX size={16} />;
      case 'hired': return <IconCheck size={16} />;
      default: return <IconFileText size={16} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedApplications = filteredApplications.slice(
    (applicationsPage - 1) * itemsPerPage,
    applicationsPage * itemsPerPage
  );

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.isActive).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length
  };

  const handleJobToggle = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
    notifications.show({
      title: 'Job Status Updated',
      message: 'Job status has been updated successfully.',
      color: 'green'
    });
  };

  const handleApplicationStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    notifications.show({
      title: 'Application Status Updated',
      message: 'Application status has been updated successfully.',
      color: 'green'
    });
  };

  // Job CRUD functions
  const openJobModal = (job?: Job) => {
    if (job) {
      setSelectedJob(job);
      setIsEditing(true);
      setJobFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        skills: [...job.skills],
        benefits: [...job.benefits]
      });
    } else {
      setSelectedJob(null);
      setIsEditing(false);
      setJobFormData({
        title: '',
        department: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: '',
        responsibilities: '',
        skills: [],
        benefits: []
      });
    }
    setJobModalOpen(true);
  };

  const handleJobSubmit = async () => {
    try {
      if (isEditing && selectedJob) {
        // Update existing job
        const response = await fetch(`/api/admin/career/jobs`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: selectedJob.id,
            updates: jobFormData
          })
        });

        if (response.ok) {
          setJobs(jobs.map(job => 
            job.id === selectedJob.id 
              ? { ...job, ...jobFormData }
              : job
          ));
          notifications.show({
            title: 'Job Updated',
            message: 'Job has been updated successfully.',
            color: 'green'
          });
        }
      } else {
        // Create new job
        const response = await fetch(`/api/admin/career/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobFormData)
        });

        if (response.ok) {
          const result = await response.json();
          setJobs([...jobs, result.data]);
          notifications.show({
            title: 'Job Created',
            message: 'New job has been created successfully.',
            color: 'green'
          });
        }
      }
      setJobModalOpen(false);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to save job. Please try again.',
        color: 'red'
      });
    }
  };

  const handleJobDelete = async (jobId: number) => {
    try {
      const response = await fetch(`/api/admin/career/jobs?id=${jobId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== jobId));
        notifications.show({
          title: 'Job Deleted',
          message: 'Job has been deleted successfully.',
          color: 'green'
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete job. Please try again.',
        color: 'red'
      });
    }
  };

  const addSkill = () => {
    const skill = prompt('Enter skill name:');
    if (skill && skill.trim()) {
      setJobFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setJobFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    const benefit = prompt('Enter benefit:');
    if (benefit && benefit.trim()) {
      setJobFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, benefit.trim()]
      }));
    }
  };

  const removeBenefit = (index: number) => {
    setJobFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="white">
        <IconBriefcase size={32} style={{ marginRight: 12 }} />
        Career Management
      </Title>

      {/* Statistics Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        <Card withBorder p="md" bg="dark.6">
          <Group>
            <ThemeIcon size="lg" variant="light" color="blue">
              <IconBriefcase size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">Total Jobs</Text>
              <Text fw={700} size="lg">{stats.totalJobs}</Text>
            </div>
          </Group>
        </Card>

        <Card withBorder p="md" bg="dark.6">
          <Group>
            <ThemeIcon size="lg" variant="light" color="green">
              <IconUserCheck size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">Active Jobs</Text>
              <Text fw={700} size="lg">{stats.activeJobs}</Text>
            </div>
          </Group>
        </Card>

        <Card withBorder p="md" bg="dark.6">
          <Group>
            <ThemeIcon size="lg" variant="light" color="yellow">
              <IconUsers size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">Total Applications</Text>
              <Text fw={700} size="lg">{stats.totalApplications}</Text>
            </div>
          </Group>
        </Card>

        <Card withBorder p="md" bg="dark.6">
          <Group>
            <ThemeIcon size="lg" variant="light" color="orange">
              <IconClock size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">Pending Review</Text>
              <Text fw={700} size="lg">{stats.pendingApplications}</Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      <Tabs value={activeTab} onChange={setActiveTab} variant="pills" color="brand">
        <Tabs.List mb="xl">
          <Tabs.Tab value="jobs" leftSection={<IconBriefcase size={16} />}>
            Job Listings ({jobs.length})
          </Tabs.Tab>
          <Tabs.Tab value="applications" leftSection={<IconUsers size={16} />}>
            Applications ({applications.length})
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="jobs">
          <Card withBorder p="md" bg="dark.6">
            <Group justify="space-between" mb="md">
              <Title order={3} c="white">Job Listings</Title>
              <Button 
                leftSection={<IconPlus size={16} />} 
                color="brand"
                onClick={() => openJobModal()}
              >
                Add New Job
              </Button>
            </Group>

            <Grid>
              {jobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <Card withBorder p="md" bg="dark.5">
                    <Group justify="space-between" mb="xs">
                      <Badge color={job.isActive ? 'green' : 'red'} variant="light">
                        {job.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Menu>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item 
                            leftSection={<IconEye size={16} />}
                            onClick={() => { setJobToView(job); setJobDetailsOpen(true); }}
                          >
                            View Details
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconEdit size={16} />}
                            onClick={() => openJobModal(job)}
                          >
                            Edit Job
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconTrash size={16} />}
                            color="red"
                            onClick={() => { setJobToDelete(job); setDeleteModalOpen(true); }}
                          >
                            Delete Job
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>

                    <Title order={4} mb="xs" c="white">{job.title}</Title>
                    
                    <Group gap="xs" mb="xs">
                      <Badge variant="light" size="sm">
                        <IconBuilding size={12} style={{ marginRight: 4 }} />
                        {job.department}
                      </Badge>
                      <Badge variant="light" size="sm">
                        <IconMapPin size={12} style={{ marginRight: 4 }} />
                        {job.location}
                      </Badge>
                    </Group>

                    <Group gap="xs" mb="md">
                      <Badge variant="light" size="sm">
                        <IconClock size={12} style={{ marginRight: 4 }} />
                        {job.type}
                      </Badge>
                      <Badge variant="light" size="sm">
                        <IconCurrencyDollar size={12} style={{ marginRight: 4 }} />
                        {job.salary}
                      </Badge>
                    </Group>

                    <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                      {job.description}
                    </Text>

                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">
                        {job.applicationsCount} applications
                      </Text>
                      <Switch
                        checked={job.isActive}
                        onChange={() => handleJobToggle(job.id)}
                        size="sm"
                      />
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="applications">
          <Card withBorder p="md" bg="dark.6">
            <Group justify="space-between" mb="md">
              <Title order={3} c="white">Applications</Title>
              <Group>
                <TextInput
                  placeholder="Search applications..."
                  leftSection={<IconSearch size={16} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.currentTarget.value)}
                  w={250}
                />
                <Select
                  placeholder="Filter by status"
                  data={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'reviewed', label: 'Reviewed' },
                    { value: 'shortlisted', label: 'Shortlisted' },
                    { value: 'rejected', label: 'Rejected' },
                    { value: 'hired', label: 'Hired' }
                  ]}
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value || 'all')}
                  w={150}
                />
                <Button variant="light" color="brand" leftSection={<IconRefresh size={16} />}>
                  Refresh
                </Button>
              </Group>
            </Group>

            <ScrollArea>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Applicant</Table.Th>
                    <Table.Th>Position</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Resume</Table.Th>
                    <Table.Th>Submitted</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedApplications.map((application) => (
                    <Table.Tr key={application.id}>
                      <Table.Td>
                        <Group>
                          <Avatar size="sm" color="blue">
                            {application.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <div>
                            <Text fw={500} size="sm">{application.name}</Text>
                            <Text size="xs" c="dimmed">{application.email}</Text>
                            {application.phone && (
                              <Text size="xs" c="dimmed">{application.phone}</Text>
                            )}
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{application.position}</Text>
                        {application.jobTitle && (
                          <Text size="xs" c="dimmed">for {application.jobTitle}</Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Badge 
                          color={getStatusColor(application.status)}
                          leftSection={getStatusIcon(application.status)}
                        >
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <IconFileText size={16} />
                          <div>
                            <Text size="sm">{application.resumeName}</Text>
                            <Text size="xs" c="dimmed">{formatFileSize(application.resumeSize)}</Text>
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{formatDate(application.submittedAt)}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="View Details">
                            <ActionIcon 
                              variant="light" 
                              color="brand"
                              onClick={() => {
                                setSelectedApplication(application);
                                setApplicationModalOpen(true);
                              }}
                            >
                              <IconEye size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Download Resume">
                            <ActionIcon variant="light" color="green">
                              <IconDownload size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Menu>
                            <Menu.Target>
                              <ActionIcon variant="light" color="gray">
                                <IconEdit size={16} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Label>Change Status</Menu.Label>
                              <Menu.Item 
                                leftSection={<IconClock size={16} />}
                                onClick={() => handleApplicationStatusChange(application.id, 'pending')}
                              >
                                Mark as Pending
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<IconEye size={16} />}
                                onClick={() => handleApplicationStatusChange(application.id, 'reviewed')}
                              >
                                Mark as Reviewed
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<IconStar size={16} />}
                                onClick={() => handleApplicationStatusChange(application.id, 'shortlisted')}
                              >
                                Shortlist
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<IconCheck size={16} />}
                                onClick={() => handleApplicationStatusChange(application.id, 'hired')}
                              >
                                Mark as Hired
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<IconX size={16} />}
                                color="red"
                                onClick={() => handleApplicationStatusChange(application.id, 'rejected')}
                              >
                                Reject
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>

            {filteredApplications.length === 0 && (
              <Alert icon={<IconSearch size={16} />} title="No applications found" color="blue" mt="md">
                No applications match your search criteria. Try adjusting your filters.
              </Alert>
            )}

            {filteredApplications.length > 0 && (
              <Group justify="center" mt="xl">
                <Pagination
                  total={Math.ceil(filteredApplications.length / itemsPerPage)}
                  value={applicationsPage}
                  onChange={setApplicationsPage}
                  color="brand"
                />
              </Group>
            )}
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Application Details Modal */}
      <Modal
        opened={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        title="Application Details"
        size="lg"
        centered
      >
        {selectedApplication && (
          <Stack>
            <Group>
              <Avatar size="lg" color="blue">
                {selectedApplication.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <div>
                <Title order={3}>{selectedApplication.name}</Title>
                <Text c="dimmed">{selectedApplication.email}</Text>
                {selectedApplication.phone && (
                  <Text c="dimmed">{selectedApplication.phone}</Text>
                )}
              </div>
            </Group>

            <Divider />

            <Group>
              <Badge color={getStatusColor(selectedApplication.status)}>
                {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
              </Badge>
              <Text size="sm">Applied for: {selectedApplication.position}</Text>
            </Group>

            {selectedApplication.message && (
              <>
                <Divider />
                <div>
                  <Text fw={500} mb="xs">Cover Letter</Text>
                  <Text size="sm">{selectedApplication.message}</Text>
                </div>
              </>
            )}

            <Divider />

            <Group>
              <Button leftSection={<IconDownload size={16} />} variant="light">
                Download Resume
              </Button>
              <Button leftSection={<IconMail size={16} />} color="blue">
                Send Email
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Job Details Modal */}
      <Modal
        opened={jobDetailsOpen}
        onClose={() => setJobDetailsOpen(false)}
        title="Job Details"
        size="lg"
        centered
      >
        {jobToView && (
          <Stack>
            <Group justify="space-between">
              <Title order={3}>{jobToView.title}</Title>
              <Badge color={jobToView.isActive ? 'green' : 'red'} variant="light">
                {jobToView.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Group>

            <Group gap="xs">
              <Badge variant="light"><IconBuilding size={14} style={{ marginRight: 4 }} />{jobToView.department}</Badge>
              <Badge variant="light"><IconMapPin size={14} style={{ marginRight: 4 }} />{jobToView.location}</Badge>
              <Badge variant="light"><IconClock size={14} style={{ marginRight: 4 }} />{jobToView.type}</Badge>
              <Badge variant="light"><IconCurrencyDollar size={14} style={{ marginRight: 4 }} />{jobToView.salary}</Badge>
            </Group>

            <Divider />

            <div>
              <Text fw={600} mb={6}>Description</Text>
              <Text c="dimmed" size="sm">{jobToView.description}</Text>
            </div>

            {jobToView.requirements && (
              <div>
                <Text fw={600} mb={6}>Requirements</Text>
                <Text c="dimmed" size="sm">{jobToView.requirements}</Text>
              </div>
            )}

            {jobToView.responsibilities && (
              <div>
                <Text fw={600} mb={6}>Responsibilities</Text>
                <Text c="dimmed" size="sm">{jobToView.responsibilities}</Text>
              </div>
            )}

            {jobToView.skills?.length > 0 && (
              <div>
                <Text fw={600} mb={6}>Skills</Text>
                <Group gap="xs">
                  {jobToView.skills.map((s, i) => (
                    <Badge key={i} variant="light" color="blue">{s}</Badge>
                  ))}
                </Group>
              </div>
            )}

            {jobToView.benefits?.length > 0 && (
              <div>
                <Text fw={600} mb={6}>Benefits</Text>
                <Group gap="xs">
                  {jobToView.benefits.map((b, i) => (
                    <Badge key={i} variant="light" color="green">{b}</Badge>
                  ))}
                </Group>
              </div>
            )}

            <Divider />

            <Group justify="space-between">
              <Text size="sm" c="dimmed">Posted: {jobToView.postedDate}</Text>
              <Text size="sm" c="dimmed">Applications: {jobToView.applicationsCount}</Text>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Job"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete {jobToDelete ? <b>{jobToDelete.title}</b> : 'this job'}? This action cannot be undone.
          </Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button color="red" onClick={() => {
              if (jobToDelete) {
                handleJobDelete(jobToDelete.id);
              }
              setDeleteModalOpen(false);
            }}>Delete</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Job Form Modal */}
      <Modal
        opened={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        title={isEditing ? "Edit Job" : "Add New Job"}
        size="xl"
        centered
      >
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Job Title"
                placeholder="e.g., Senior Software Engineer"
                value={jobFormData.title}
                onChange={(e) => setJobFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Department"
                placeholder="Select department"
                data={[
                  "Engineering",
                  "Product",
                  "Design",
                  "Marketing",
                  "Sales",
                  "Operations",
                  "Finance",
                  "Human Resources",
                  "IT"
                ]}
                value={jobFormData.department}
                onChange={(value) => setJobFormData(prev => ({ ...prev, department: value || '' }))}
                required
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Location"
                placeholder="Select location"
                data={[
                  "Remote",
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Toronto",
                  "Vancouver"
                ]}
                value={jobFormData.location}
                onChange={(value) => setJobFormData(prev => ({ ...prev, location: value || '' }))}
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Job Type"
                placeholder="Select job type"
                data={[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship"
                ]}
                value={jobFormData.type}
                onChange={(value) => setJobFormData(prev => ({ ...prev, type: value || '' }))}
                required
              />
            </Grid.Col>
          </Grid>

          <TextInput
            label="Salary Range"
            placeholder="e.g., $80,000 - $120,000"
            value={jobFormData.salary}
            onChange={(e) => setJobFormData(prev => ({ ...prev, salary: e.target.value }))}
            required
          />

          <Textarea
            label="Job Description"
            placeholder="Describe the role and responsibilities..."
            value={jobFormData.description}
            onChange={(e) => setJobFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
          />

          <Textarea
            label="Requirements"
            placeholder="List the requirements and qualifications..."
            value={jobFormData.requirements}
            onChange={(e) => setJobFormData(prev => ({ ...prev, requirements: e.target.value }))}
            rows={3}
          />

          <Textarea
            label="Responsibilities"
            placeholder="List the key responsibilities..."
            value={jobFormData.responsibilities}
            onChange={(e) => setJobFormData(prev => ({ ...prev, responsibilities: e.target.value }))}
            rows={3}
          />

          <div>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Skills</Text>
              <Button size="xs" variant="light" onClick={addSkill}>
                Add Skill
              </Button>
            </Group>
            <Group gap="xs">
              {jobFormData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  checked={false}
                  onClick={() => removeSkill(index)}
                  variant="light"
                  color="blue"
                >
                  {skill} ×
                </Chip>
              ))}
            </Group>
          </div>

          <div>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Benefits</Text>
              <Button size="xs" variant="light" onClick={addBenefit}>
                Add Benefit
              </Button>
            </Group>
            <Group gap="xs">
              {jobFormData.benefits.map((benefit, index) => (
                <Chip
                  key={index}
                  checked={false}
                  onClick={() => removeBenefit(index)}
                  variant="light"
                  color="green"
                >
                  {benefit} ×
                </Chip>
              ))}
            </Group>
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setJobModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleJobSubmit}>
              {isEditing ? 'Update Job' : 'Create Job'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
