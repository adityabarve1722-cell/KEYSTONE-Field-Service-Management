# KEYSTONE — Field Service Management Platform

## Project Overview

KEYSTONE is a full-stack Field Service Management Platform designed for commercial facilities maintenance operations.

The system helps manage customers, technicians, work orders, service requests and operational information through a centralized web application.

## Technology Stack

### Backend
- Java
- Spring Boot 4.1.1
- Spring Data JPA
- Spring Security
- JWT Authentication
- Maven

### Frontend
- React
- TypeScript
- Vite

### Database
- MySQL 8
- Database: `collegedb`

## Main Features

- Secure JWT-based login
- Customer management
- Technician management
- Work order management
- Add, view, update and delete records
- Dashboard with system statistics
- Technician availability/status
- Work order status tracking
- Protected backend APIs
- React frontend connected with Spring Boot backend

## Project Structure

```text
KEYSTONE_SUBMISSION
│
├── backend
│   └── Spring Boot application
│
├── frontend
│   └── React + TypeScript application
│
├── collegedb.sql
│   └── MySQL database backup
│
└── README.md