-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 08:32 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `education`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE DATABASE education;
USE education;

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `professor` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `professor`, `year`, `created_at`, `updated_at`) VALUES
(5, 'Hello world this is new annoucement', 'Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement Hello world this is new annoucement', 2, 2, '2023-08-04 17:13:44', '2023-08-04 17:13:44'),
(7, 'New for civil development about autocad', 'AutoCAD is a commercial computer-aided design (CAD) and drafting software application. Developed and marketed by Autodesk, AutoCAD was first released in December 1982 as a desktop app running on microcomputers with internal graphics controllers.', 2, 24, '2023-08-04 17:51:00', '2023-08-04 17:51:00'),
(8, 'New for civil development about autocad', 'AutoCAD is a commercial computer-aided design (CAD) and drafting software application. Developed and marketed by Autodesk, AutoCAD was first released in December 1982 as a desktop app running on microcomputers with internal graphics controllers.', 2, 24, '2023-08-04 17:51:39', '2023-08-04 17:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `code` char(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `information` text DEFAULT NULL,
  `professor` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `course` int(11) NOT NULL,
  `deadline` timestamp NULL DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `allow_update` tinyint(1) NOT NULL DEFAULT 0,
  `accept_answer` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `code`, `title`, `information`, `professor`, `year`, `subject`, `course`, `deadline`, `file`, `link`, `allow_update`, `accept_answer`, `created_at`, `updated_at`) VALUES
(44, 'MTH002', 'Matching headings strategies in IELTS Reading', 'This question type requires you to match the heading in the question to the correct paragraph or reading section in the text. There will always be more headings than paragraphs or sections so that some headings will not be used. It is also possible that some of the text may not be included in the task. This task type is used with texts that contain paragraphs that have clearly defined themes. It tests your ability to recognise the main idea in the paragraph and to identify supporting ideas.\r\n\r\n', 2, 2, 2, 7, '2023-08-31 05:40:03', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', 'https://www.youtube.com/watch?v=Jkj36B1YuDU', 1, 1, '2023-06-30 05:42:02', '2023-06-30 05:42:02'),
(45, 'ARC_150', 'Heat Engine & COP', 'We\'re always working on creating tools and experiences which continue to support a positive modding community, make modding more accessible and give creators the ability to share their own creations. To help us achieve our mission, we\'re looking to hire new talented back-end web developers to join us at our office in Exeter, UK.\r\n\r\nWorking at Nexus Mods means the projects you help bring to life will be used by millions of gamers worldwide each month, with a wealth of feedback coming directly from the one and only stakeholder - the community - to help us shape the future of modding.\r\n\r\nBeing able to work on-site at our office in Exeter is required for this role, we can assist with relocation expenses and logistics for the right candidate. To apply, you will need the right to work in the UK as we cannot sponsor a VISA at this time.', 2, 2, 8, 12, '2023-07-14 19:17:25', 'defaults/user.svg', 'https://www.lipsum.com/', 1, 1, '2023-07-13 19:19:16', '2023-07-13 19:19:16'),
(46, 'NMA101', 'New My Assignment', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 2, 8, 12, '2023-07-28 20:52:00', 'uploads/assignments/1690145569_64bd932126a41_au18pwf5bt.pdf', 'https://www.facebook.com/', 0, 1, '2023-07-23 17:52:49', '2023-07-23 17:52:49'),
(49, 'AS_AIRC231', 'Added Assignment', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 2, 8, 12, '2023-07-28 08:11:00', 'uploads/assignments/1690145785_64bd93f9133df_1fo904kwfa.pdf', 'https://www.facebook.com/', 0, 1, '2023-07-23 17:56:25', '2023-07-23 17:56:25');

-- --------------------------------------------------------

--
-- Table structure for table `assignment_answers`
--

CREATE TABLE `assignment_answers` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `assignment` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_answers`
--

INSERT INTO `assignment_answers` (`id`, `student`, `assignment`, `file`, `notes`, `created_at`, `updated_at`) VALUES
(9, 1, 44, 'uploads/assignments/answers/1688126204_649ec2fc14343_k56th8vxn3.pdf', NULL, '2023-06-30 08:56:44', '2023-06-30 08:56:44'),
(10, 1, 45, 'uploads/assignments/answers/1689340597_64b14ab5ac993_0jzi2cv30b.pdf', NULL, '2023-07-14 10:16:37', '2023-07-14 10:16:37'),
(12, 1, 49, 'uploads/assignments/answers/1690393532_64c15bbc8a052_ul7cxqj9dk.pdf', NULL, '2023-07-26 14:45:32', '2023-07-26 14:45:32');

-- --------------------------------------------------------

--
-- Table structure for table `assignment_grade`
--

CREATE TABLE `assignment_grade` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `assignment` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `grade` smallint(6) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assignment_warnings`
--

CREATE TABLE `assignment_warnings` (
  `id` int(11) NOT NULL,
  `assignment` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_warnings`
--

INSERT INTO `assignment_warnings` (`id`, `assignment`, `student`, `reason`, `created_at`) VALUES
(14, 45, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', '2023-07-15 16:34:01'),
(15, 45, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', '2023-07-15 16:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `title`, `icon`, `created_at`) VALUES
(1, 'Hero', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04'),
(2, 'Helpful', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04'),
(3, 'Great', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04'),
(4, 'Hero', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04'),
(5, 'Helpful', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04'),
(6, 'Great', 'uploads/students/1666987683_asaber.png', '2023-07-01 09:21:04');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `info` text DEFAULT NULL,
  `file` varchar(255) NOT NULL,
  `subject` int(11) NOT NULL,
  `number` tinyint(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `name`, `info`, `file`, `subject`, `number`, `created_at`, `updated_at`) VALUES
(1, 'Light Characteristics', 'Light CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight Characteristics', 'uploads/chapters/1667016159_635ca5df359f3_mojny80642.pdf', 1, 1, '2022-10-29 02:02:39', '2022-10-29 02:02:39'),
(2, 'DC Motors', 'DC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC', 'uploads/chapters/1667104110_635dfd6ec56c4_neyrxcvvx8.pdf', 1, 2, '2022-10-30 02:28:30', '2022-10-30 02:28:30'),
(3, 'Fourier Transform', 'HDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFD', 'uploads/chapters/1667266461_6360779d84228_7b2whhusde.pdf', 1, 3, '2022-10-31 23:34:21', '2022-10-31 23:34:21'),
(4, 'Motors & Components', 'sdfsdfsdfsdfsdfsfdsdfsdf sdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfd', 'uploads/chapters/1667302476_6361044c836d5_s4qfrn4524.pdf', 2, 2, '2022-11-01 09:34:36', '2022-11-01 09:34:36'),
(5, 'New Ch1', 'New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1 New Ch1', 'uploads/chapters/1667654373_636662e57eb3b_8caax0kqpo.pdf', 9, 1, '2022-11-05 11:19:33', '2022-11-05 11:19:33'),
(6, 'New Ch2', 'New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2 New Ch2New Ch2New Ch2New Ch2New Ch2', 'uploads/chapters/1667654406_636663068c375_0mjfboudxo.pdf', 9, 2, '2022-11-05 11:20:06', '2022-11-05 11:20:06'),
(7, 'Airplace Ch1', 'Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1 Airplace Ch1', 'uploads/chapters/1667654434_636663226ac93_4v9mg6f8te.pdf', 6, 1, '2022-11-05 11:20:34', '2022-11-05 11:20:34'),
(8, 'Aircraft Design 01', 'Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01 Aircraft Design 01', 'uploads/chapters/1667654454_636663364af68_ddecx7wae2.pdf', 8, 1, '2022-11-05 11:20:54', '2022-11-05 11:20:54'),
(9, 'Plane Motors', 'Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors Plane MotorsPlane Motors', 'uploads/chapters/1667654487_63666357639dd_rrkjzxsty3.pdf', 7, 1, '2022-11-05 11:21:27', '2022-11-05 11:21:27'),
(10, 'Libid', 'Light CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight CharacteristicsLight Characteristics', 'uploads/chapters/1667016159_635ca5df359f3_mojny80642.pdf', 1, 4, '2022-10-29 02:02:39', '2022-10-29 02:02:39'),
(11, 'Vitimanies', 'DC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC MotorsDC', 'uploads/chapters/1667104110_635dfd6ec56c4_neyrxcvvx8.pdf', 1, 5, '2022-10-30 02:28:30', '2022-10-30 02:28:30'),
(12, 'Carbohydarite', 'HDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFDHDFDFGHGFD', 'uploads/chapters/1667266461_6360779d84228_7b2whhusde.pdf', 1, 6, '2022-10-31 23:34:21', '2022-10-31 23:34:21'),
(13, 'Transformers', 'sdfsdfsdfsdfsdfsfdsdfsdf sdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfdsdfsdfsdfsdfsdfsfd', 'uploads/chapters/1667302476_6361044c836d5_s4qfrn4524.pdf', 2, 1, '2022-11-01 09:34:36', '2022-11-01 09:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `subject`, `year`, `title`, `info`, `created_at`, `updated_at`) VALUES
(6, 1, 2, 'Fourier Transformations', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-31 04:37:35', '2022-10-31 04:37:35'),
(7, 2, 2, 'Light Principles', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-31 04:37:50', '2022-10-31 04:37:50'),
(8, 6, 3, 'Airplane Sturcture Principles', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 09:15:24', '2022-11-05 09:15:24'),
(9, 7, 3, 'Motors Types', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:18:38', '2022-11-05 11:18:38'),
(10, 5, 3, 'Design Priniciples and First Project', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:18:58', '2022-11-05 11:18:58'),
(12, 8, 2, 'Crafting Materials', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-06-29 03:21:50', '2023-06-29 03:21:50'),
(19, 1, 7, 'Fourier Transformations', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-31 04:37:35', '2022-10-31 04:37:35'),
(20, 2, 7, 'Light Principles', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-31 04:37:50', '2022-10-31 04:37:50'),
(21, 8, 7, 'Crafting Materials', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-06-29 03:21:50', '2023-06-29 03:21:50'),
(22, 6, 8, 'Airplane Sturcture Principles', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 09:15:24', '2022-11-05 09:15:24'),
(23, 7, 8, 'Motors Types', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:18:38', '2022-11-05 11:18:38'),
(24, 5, 8, 'Design Priniciples and First Project', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:18:58', '2022-11-05 11:18:58');

-- --------------------------------------------------------

--
-- Table structure for table `course_grade`
--

CREATE TABLE `course_grade` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `course` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `oral` smallint(6) NOT NULL,
  `midterm` smallint(6) NOT NULL,
  `final` smallint(6) NOT NULL,
  `assignments` smallint(6) NOT NULL,
  `lab` smallint(6) NOT NULL,
  `smart` smallint(6) NOT NULL,
  `total` smallint(8) NOT NULL,
  `quizzes` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_grade`
--

INSERT INTO `course_grade` (`id`, `student`, `semester`, `year`, `course`, `subject`, `oral`, `midterm`, `final`, `assignments`, `lab`, `smart`, `total`, `quizzes`, `created_at`, `updated_at`) VALUES
(17, 1, 16, 2, 6, 1, 10, 10, 10, 12, 10, 10, 200, 10, '2022-11-05 14:54:50', '2022-11-05 14:54:50'),
(19, 1, 16, 2, 7, 2, 6, 3, 152, 10, 5, 4, 182, 2, '2022-12-01 17:33:53', '2022-12-01 17:33:53'),
(20, 1, 16, 2, 12, 8, 10, 20, 100, 5, 5, 5, 150, 5, '2023-06-29 06:26:16', '2023-06-29 06:26:16'),
(22, 1, 22, 3, 10, 5, 6, 3, 152, 10, 5, 4, 182, 2, '2022-12-01 17:33:53', '2022-12-01 17:33:53'),
(23, 1, 22, 3, 8, 6, 10, 20, 100, 5, 5, 5, 150, 5, '2023-06-29 06:26:16', '2023-06-29 06:26:16');

-- --------------------------------------------------------

--
-- Table structure for table `course_lectures`
--

CREATE TABLE `course_lectures` (
  `id` int(11) NOT NULL,
  `course` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `file` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_lectures`
--

INSERT INTO `course_lectures` (`id`, `course`, `title`, `information`, `file`, `video`, `created_at`, `updated_at`) VALUES
(1, 6, 'Quantum Theory - Light Effect', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'uploads/lectures/files/1667260157_63605efdea75f_1792owhli3.pdf', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', '2022-10-31 21:49:17', '2022-10-31 21:49:17'),
(2, 6, 'La Place Inverse', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'uploads/lectures/files/1667260157_63605efdea75f_1792owhli3.pdf', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', '2022-10-31 21:49:17', '2022-10-31 21:49:17'),
(3, 6, 'Solve Circuits', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'uploads/lectures/files/1667260157_63605efdea75f_1792owhli3.pdf', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', '2022-10-31 21:49:17', '2022-10-31 21:49:17'),
(4, 6, 'Heisenberg Theory', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'uploads/lectures/files/1667260157_63605efdea75f_1792owhli3.pdf', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', '2022-10-31 21:49:17', '2022-10-31 21:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `title`, `icon`, `info`, `created_at`, `updated_at`) VALUES
(1, 'Mechanical Department', 'uploads/departments/1667645286_63663f6628af6_qxsdwjb2my.png', 'defaults/department.svg', '2022-10-28 19:43:21', '2022-10-28 19:43:21'),
(2, 'Electrical Engineering', 'uploads/departments/1667645286_63663f6628af6_qxsdwjb2my.png', 'Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering2222', '2022-10-28 19:57:34', '2022-10-28 19:57:34'),
(3, 'Aerospace Engineering', 'uploads/departments/1667645286_63663f6628af6_qxsdwjb2my.png', 'Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering Aerospace Engineering2222', '2022-11-05 08:48:06', '2022-11-05 08:49:05'),
(4, 'Civil Engineering', 'uploads/departments/1690050378_64bc1f4a69106_igsvthp44d.svg', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)', '2023-07-22 15:26:18', '2023-07-22 15:26:18'),
(5, 'Industrial Engineering', 'uploads/departments/1690394416_64c15f3047570_q0nawoij53.JPG', 'Industrial Industrial Industrial Industrial Industrial Industrial Industrial Industrial Industrial Industrial', '2023-07-26 15:00:16', '2023-08-04 15:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `professors`
--

CREATE TABLE `professors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL DEFAULT 'defaults/user.svg',
  `fb` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `username` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `department` int(11) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `professors`
--

INSERT INTO `professors` (`id`, `name`, `title`, `email`, `password`, `picture`, `fb`, `created_at`, `updated_at`, `username`, `phone`, `type`, `department`, `remember_token`) VALUES
(2, 'Abdulrahman Saber', 'DR', 'a@a.com', '$2y$10$FdmfV4GNOE5j1RoemfuSHuMwfJNoeW1hT6hIqUcESc6HNLQWGeXUG', 'defaults/avatars/07.svg', NULL, '2022-10-28 17:43:25', '2022-10-28 17:43:25', 'asaber', 1123525123, 0, 1, 'chTMDJ6NsTgjGwCmGkCxqGRszxKD3LXlCtERsUUhaTqQrHU73JK5lixRCIF6'),
(12, 'Ahmed Saber', 'Prof.', 'a@asaber.com', '$2y$10$ryU.bI9eQTs8V6AHweT53u.qVPb5gMm20zwSz3sgSE9gjwd9QBVm6', 'defaults/user.svg', NULL, '2023-08-05 12:09:31', '2023-08-05 12:09:31', 'ahmed_saber', 1276274460, 0, 1, NULL),
(14, 'Abdulrahman Saber', 'DR', 'a@aaa.com', '$2y$10$FdmfV4GNOE5j1RoemfuSHuMwfJNoeW1hT6hIqUcESc6HNLQWGeXUG', 'defaults/avatars/07.svg', NULL, '2022-10-28 17:43:25', '2022-10-28 17:43:25', 'asaberss', 1123525123, 0, 2, 'chTMDJ6NsTgjGwCmGkCxqGRszxKD3LXlCtERsUUhaTqQrHU73JK5lixRCIF6'),
(15, 'Ahmed Saber', 'Prof.', 'a@asadasber.com', '$2y$10$ryU.bI9eQTs8V6AHweT53u.qVPb5gMm20zwSz3sgSE9gjwd9QBVm6', 'defaults/user.svg', NULL, '2023-08-05 12:09:31', '2023-08-05 12:09:31', 'ahmed_saberasd', 1276274460, 0, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question_mcq`
--

CREATE TABLE `question_mcq` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `question` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> MCQ\r\n1 -> Input Field',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question_mcq`
--

INSERT INTO `question_mcq` (`id`, `title`, `question`, `is_correct`, `type`, `created_at`, `updated_at`) VALUES
(214, '50.159', 58, 0, 0, '2023-06-29 00:11:30', '2023-06-29 00:12:27'),
(215, '30.22', 58, 1, 0, '2023-06-29 00:11:30', '2023-06-29 00:12:27'),
(216, '3.14', 59, 1, 0, '2023-06-29 00:11:30', '2023-06-29 00:12:25'),
(217, '20.15', 59, 0, 0, '2023-06-29 00:11:30', '2023-06-29 00:12:25'),
(218, 'True', 60, 0, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:42'),
(219, 'False', 60, 1, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:42'),
(220, 'False', 61, 0, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:40'),
(221, 'True', 61, 1, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:40'),
(222, 'Google', 62, 1, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:39'),
(223, 'Picsart', 62, 0, 0, '2023-06-29 00:11:30', '2023-06-29 00:56:39'),
(232, 'A', 67, 1, 0, '2023-07-23 17:18:05', '2023-07-23 17:18:58'),
(233, 'B', 67, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:18:58'),
(234, 'C', 67, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:18:58'),
(235, 'D', 67, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:18:58'),
(236, 'A', 68, 1, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:35'),
(237, 'B', 68, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:35'),
(238, 'C', 68, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:35'),
(239, 'D', 68, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:35'),
(240, 'A', 69, 1, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:39'),
(241, 'B', 69, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:39'),
(242, 'C', 69, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:39'),
(243, 'D', 69, 0, 0, '2023-07-23 17:18:05', '2023-07-23 17:19:39'),
(244, '1', 70, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:21'),
(245, '2', 70, 1, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:21'),
(246, '3', 70, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:21'),
(247, '4', 70, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:21'),
(248, '1', 71, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:31'),
(249, '2', 71, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:31'),
(250, '3', 71, 1, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:31'),
(251, 'N/A', 71, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:31'),
(252, '1', 72, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:38'),
(253, '2', 72, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:38'),
(254, '3', 72, 1, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:38'),
(255, '4', 72, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:38'),
(256, '1', 73, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:48'),
(257, '2', 73, 1, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:48'),
(258, '3', 73, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:48'),
(259, '4', 73, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:48'),
(260, '1', 74, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:55'),
(261, '2', 74, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:55'),
(262, '3', 74, 1, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:55'),
(263, '4', 74, 0, 0, '2023-07-26 15:03:58', '2023-07-26 15:04:55');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `professor` int(11) NOT NULL DEFAULT 2,
  `code` varchar(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `grade` tinyint(6) NOT NULL DEFAULT 20,
  `start` timestamp NOT NULL DEFAULT current_timestamp(),
  `end` timestamp NOT NULL DEFAULT current_timestamp(),
  `minutes` tinyint(6) NOT NULL DEFAULT 20,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 => Disable from students\r\n///////////////////////////////\r\n1 => Allow students to see quiz now? but it''s not opened!\r\n/////////////////////////////\r\n2 => Open Quiz\r\n\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `year`, `subject`, `professor`, `code`, `title`, `information`, `grade`, `start`, `end`, `minutes`, `created_at`, `updated_at`, `status`) VALUES
(12, 2, 3, 2, 'Q101', 'Quiz 0001 - Chapter 1 - Structure', 'To filter an array of objects with another array of objects in JavaScript, use the “filter()” method and “some()” method in combination. It is such that the former method is applied on the first array and the latter method upon the second array such that the values passing the provided test are returned. This blog discussed the procedure for filtering an object’s array with another object’s array using JavaScript.', 10, '2022-11-16 08:42:00', '2023-07-01 06:39:00', 30, '2022-11-06 06:43:08', '2023-06-28 20:10:16', 1),
(21, 2, 2, 2, 'QMT100', 'Quiz For Testing About Mechanics', 'To filter an array of objects with another array of objects in JavaScript, use the “filter()” method and “some()” method in combination. It is such that the former method is applied on the first array and the latter method upon the second array such that the values passing the provided test are returned. This blog discussed the procedure for filtering an object’s array with another object’s array using JavaScript.', 3, '2023-07-01 06:00:00', '2023-07-01 06:33:00', 30, '2023-06-29 00:11:30', '2023-06-29 00:11:30', 1),
(22, 2, 3, 2, 'Q230', 'Quiz 02 - Machine', 'To filter an array of objects with another array of objects in JavaScript, use the “filter()” method and “some()” method in combination. It is such that the former method is applied on the first array and the latter method upon the second array such that the values passing the provided test are returned. This blog discussed the procedure for filtering an object’s array with another object’s array using JavaScript.', 5, '2023-06-30 15:05:58', '2023-06-29 08:20:00', 30, '2023-06-29 02:21:33', '2023-06-29 02:21:33', 1),
(24, 2, 3, 2, NULL, 'Today\'s Quiz about something', 'This question type requires you to match the heading in the question to the correct paragraph or reading section in the text. There will always be more headings than paragraphs or sections so that some headings will not be used. It is also possible that some of the text may not be included in the task. This task type is used with texts that contain paragraphs that have clearly defined themes. It tests your ability to recognise the main idea in the paragraph and to identify supporting ideas.', 5, '2023-07-23 20:17:00', '2023-07-23 20:40:00', 20, '2023-07-23 17:18:05', '2023-07-23 17:18:40', 2),
(25, 3, 2, 2, NULL, 'sadasdasdsadasdasdsadasdasdsadasdasd', 'new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}new-assignment/{year}', 50, '2023-07-26 18:03:00', '2023-07-27 18:03:00', 40, '2023-07-26 15:03:58', '2023-07-26 15:05:42', 2);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `answer` varchar(255) NOT NULL,
  `quiz` int(11) NOT NULL,
  `grade` tinyint(6) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `title`, `answer`, `quiz`, `grade`, `image`, `created_at`, `updated_at`) VALUES
(58, 'Hello world?', '30.22', 21, 1, 'uploads/students/1666987683_asaber.png', '2023-06-29 00:11:30', '2023-06-29 00:11:46'),
(59, 'PI constant value?', '3.14', 21, 1, NULL, '2023-06-29 00:11:30', '2023-06-29 00:12:17'),
(60, 'Is this good for rotor?', 'True', 21, 1, NULL, '2023-06-29 00:11:30', '2023-06-29 00:12:40'),
(61, 'print(\"Hello world\"); is true in python?', 'False', 21, 1, NULL, '2023-06-29 00:11:30', '2023-06-29 00:13:03'),
(62, 'App for making video editing?', 'Picsart', 21, 1, 'uploads/students/1666987683_asaber.png', '2023-06-29 00:11:30', '2023-06-29 00:13:24'),
(65, 'Machine Part of rotor?', 'Stator', 22, 1, NULL, '2023-06-29 02:21:33', '2023-06-29 02:25:50'),
(66, 'Rotor is created from?', 'Plastic', 22, 1, 'uploads/students/1666987683_asaber.png', '2023-06-29 02:21:33', '2023-06-29 02:25:43'),
(67, 'First user', 'First user', 24, 1, 'uploads/quizzes/1690143853_64bd8c6d54f87_ozeangi3zt.JPG', '2023-07-23 17:18:05', '2023-07-23 17:24:13'),
(68, 'Second questions is', 'A', 24, 1, NULL, '2023-07-23 17:18:05', '2023-07-23 17:19:35'),
(69, 'Third question about something', 'A', 24, 1, NULL, '2023-07-23 17:18:05', '2023-07-23 17:19:39'),
(70, 'pi value', '2', 25, 1, NULL, '2023-07-26 15:03:58', '2023-07-26 15:04:21'),
(71, 'n', '3', 25, 1, NULL, '2023-07-26 15:03:58', '2023-07-26 15:04:31'),
(72, 'h', '3', 25, 1, NULL, '2023-07-26 15:03:58', '2023-07-26 15:04:38'),
(73, 'g', '2', 25, 1, NULL, '2023-07-26 15:03:58', '2023-07-26 15:04:48'),
(74, 'a', '3', 25, 1, NULL, '2023-07-26 15:03:58', '2023-07-26 15:04:55');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_student_grade`
--

CREATE TABLE `quiz_student_grade` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `quiz` int(11) NOT NULL,
  `question` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `grade` int(6) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_student_grade`
--

INSERT INTO `quiz_student_grade` (`id`, `student`, `quiz`, `question`, `answer`, `grade`, `created_at`, `updated_at`) VALUES
(26, 1, 21, 59, 217, 0, '2023-06-30 11:48:48', '2023-06-30 20:37:00'),
(27, 1, 21, 60, 219, 0, '2023-06-30 11:48:51', '2023-06-30 11:48:51'),
(28, 1, 21, 61, 220, 1, '2023-06-30 11:48:53', '2023-06-30 20:37:50'),
(31, 1, 21, 58, 214, 0, '2023-06-30 20:35:18', '2023-07-01 03:05:12'),
(32, 1, 21, 62, 223, 1, '2023-06-30 20:37:34', '2023-06-30 20:37:34'),
(33, 1, 24, 67, 232, 1, '2023-07-23 17:20:22', '2023-07-23 17:20:22'),
(34, 1, 24, 68, 236, 1, '2023-07-23 17:20:25', '2023-07-23 17:20:25'),
(35, 1, 24, 69, 243, 0, '2023-07-23 17:20:26', '2023-07-23 17:21:16');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `student`, `year`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'Report about something wrong!', 'A text editor for Chrome OS and Chrome.\r\nText.app is a simple text editor for Chrome OS and Chrome. It\'s fast, lets you open multiple files at once, has syntax highlighting, and saves to Google Drive on Chrome OS.\r\n\r\nFile bugs:\r\nhttps://github.com/GoogleChrome/text-app/issues\r\n\r\nVersion 0.7.14\r\n- Added a link showing the keyboard shortcuts (in Settings)\r\n- Improved keyboard navigation in the menu\r\n- Fixed a bug affecting some keyboard shortcuts when caps lock is on\r\n\r\nVersion 0.7\r\n- Improved the contrast of line numbers and file name text\r\n- Added languages: English (United Kingdom), Spanish (Latin America)', '2023-07-11 15:03:07', '2023-07-11 15:03:07'),
(2, 1, 2, 'Hello this is my new report', 'A text editor for Chrome OS and Chrome.\nText.app is a simple text editor for Chrome OS and Chrome. It\'s fast, lets you open multiple files at once, has syntax highlighting, and saves to Google Drive on Chrome OS.\n\nFile bugs:\nhttps://github.com/GoogleChrome/text-app/issues\n\nVersion 0.7.14\n- Added a link showing the keyboard shortcuts (in Settings)\n- Improved keyboard navigation in the menu\n- Fixed a bug affecting some keyboard shortcuts when caps lock is on\n\nVersion 0.7\n- Improved the contrast of line numbers and file name text\n- Added languages: English (United Kingdom), Spanish (Latin America)', '2023-07-11 12:13:00', '2023-07-11 12:13:00'),
(3, 1, 2, 'asdasdasdasdasdasda', 'asdasdasdasdasdasda asdasdasdasdasdasda asdasdasdasdasdasda \nasdasdasdasdasdasda \nasdasdasdasdasdasda', '2023-07-26 14:56:26', '2023-07-26 14:56:26');

-- --------------------------------------------------------

--
-- Table structure for table `report_answer`
--

CREATE TABLE `report_answer` (
  `id` int(11) NOT NULL,
  `report` int(11) NOT NULL,
  `professor` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report_answer`
--

INSERT INTO `report_answer` (`id`, `report`, `professor`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'You can also invert the colors—with light text on dark backgrounds—with .table-dark.', ' Fewer examples\nA witness gave a detailed description of the man.\nHe gave a very vivid and often shocking description of his time in prison.\nThe book contains lyrical descriptions of the author\'s childhood.\nWould you say that is an accurate description of the current situation?\nA woman of your description was seen in the area on the night of the crime.', '2023-07-11 16:44:52', '2023-07-11 16:44:52');

-- --------------------------------------------------------

--
-- Table structure for table `sent_emails`
--

CREATE TABLE `sent_emails` (
  `id` int(11) NOT NULL,
  `professor` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `importance` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `code`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'STUDENTS_PASSWORDS', 'students_default_password', '123456789', '2022-11-17 15:26:17', '2023-08-05 18:15:59'),
(2, 'STUDENT_CAN_UPDATE_INFORMATION', 'student_can_update_information', '1', '2022-11-17 15:27:12', '2023-08-05 18:15:59'),
(3, 'sada', 'can_reset_password', '1', '2022-11-17 15:27:40', '2023-08-05 18:15:59'),
(4, 'students_can_login', 'students_can_login', '1', '2022-11-17 15:28:11', '2023-08-05 18:15:59'),
(5, 'students_can_upload_content', 'students_can_upload_content', '1', '2022-11-17 15:28:23', '2023-08-05 18:15:59'),
(6, 'default_lang', 'default_lang', 'Arabic', '2022-11-17 15:38:26', '2023-08-05 18:15:59'),
(7, 'default_theme', 'default_theme', 'Light', '2022-11-17 15:38:41', '2023-08-05 18:15:59'),
(8, 'change_username', 'change_username', '1', '2022-11-17 16:32:28', '2023-08-05 18:15:59'),
(9, 'app_name', 'app_name', 'o-Edu', '2022-11-17 16:32:28', '2023-08-05 15:20:24'),
(10, 'app_description', 'app_description', 'Something', '2022-11-17 16:32:28', '2023-08-05 15:20:24'),
(11, 'app_logo', 'app_logo', 'uploads/logo/1691260148_64ce94f44fc88_ppdx7hflq6.png', '2022-11-17 16:32:28', '2023-08-05 15:29:08'),
(12, 'app_mode', 'app_mode', 'holiday', '2022-11-17 16:32:28', '2023-08-10 15:28:17');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `arabic_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `national_id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `department` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL DEFAULT 'defaults/user.svg',
  `university_code` bigint(20) NOT NULL,
  `university_email` varchar(255) NOT NULL,
  `allow_uploading_summary` tinyint(1) NOT NULL DEFAULT 1,
  `allow_login` tinyint(1) NOT NULL DEFAULT 1,
  `allow_reset_password` tinyint(1) NOT NULL DEFAULT 1,
  `allow_update` tinyint(1) NOT NULL DEFAULT 1,
  `role` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 => Student\r\n2 => Creator',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `remember_token` text DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `username`, `name`, `arabic_name`, `email`, `national_id`, `password`, `phone`, `address`, `department`, `year`, `picture`, `university_code`, `university_email`, `allow_uploading_summary`, `allow_login`, `allow_reset_password`, `allow_update`, `role`, `created_at`, `updated_at`, `remember_token`, `email_verified_at`) VALUES
(1, 'asaber', 'Abdelrhman Saber', 'Abdelrhman Saber', 'abdulrahmansaber120@gmail.com', 30202251301375, '$2y$10$M.MIeVLIFngsVQejURAloOV6whsq6XHOrOK3OzF4s8GcuAIM7qtSC', 1252512366, 'Zagazig, Samy\'s st', 1, 2, 'uploads/students/csv/1690394134_64c15e16abf8f_bezgyha2u4.jpg', 20202020202020, '20202020202020@app.eg', 1, 1, 1, 1, 1, '2022-10-28 18:08:03', '2023-07-26 14:55:34', 'ABpw2sNNnqhpaDq8HjrfimPtsbXhDQfCqcx4n8aLsrdFy0PvZBHNopMFhTUt', NULL),
(32, 'khaled_wagdy', 'Khaled Wagdey', 'Khaled Wagdey', 'khaled_wagdy@gmail.com', 30202251301375, '0552320541', 1252512375, 'Zagazig, Samy\'s st', 1, 2, 'uploads/students/1666987683_asaber.png', 20202020202020, '20202020202020@app.eg', 1, 1, 1, 1, 1, '2022-10-28 18:08:03', '2022-10-28 18:08:03', NULL, NULL),
(39, 'shorouk_khaled32', 'Shorouk Ahmed Saber Saad Khaled23', 'شروق احمد صابر سعد خالد', 'shorouk_khaled@gmail.com32', 30200555717133, '$2y$10$HTj95gwcnyJBcVb9gGxr.O.c/Zl7.nsuDwFJ.pvBhvOeQQGwT62/C', 1152365422, 'Egypt,Zagizag Cairo', 1, 2, 'uploads/students/1683729888_shorouk_khaled32.jpg', 30202251301333, '30202251301333@eng.zu.app.com', 1, 1, 1, 1, 1, '2023-05-10 10:44:28', '2023-05-10 11:44:48', 'chTMDJ6NsTgjGwCmGkCxqGRszxKD3LXlCtERsUUhaTqQrHU73JK5lixRCIF6', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_badges`
--

CREATE TABLE `student_badges` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `badge` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_badges`
--

INSERT INTO `student_badges` (`id`, `student`, `badge`, `created_at`) VALUES
(1, 1, 2, '2023-07-01 09:21:15'),
(2, 1, 1, '2023-07-01 09:21:19'),
(3, 32, 2, '2023-07-01 09:21:15');

-- --------------------------------------------------------

--
-- Table structure for table `student_notifications`
--

CREATE TABLE `student_notifications` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `professor` int(11) NOT NULL,
  `url` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_notifications`
--

INSERT INTO `student_notifications` (`id`, `student`, `title`, `message`, `professor`, `url`, `is_read`, `created_at`) VALUES
(4, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(7, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(8, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(9, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(10, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(11, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(12, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(13, 1, 'Semester Mechanical Engineering - First Year grades has been added', 'Your grades for semester Mechanical Engineering - First Year has been added!', 2, '', 1, '2022-11-05 14:54:50'),
(14, 32, 'Assignment MTH001 warning!', 'Your grades for semester Mechanical Engineering - First Year has been added!Your grades for semester Mechanical Engineering - First Year has been added!', 2, 'HTTP/1.0 302 Found\r\nCache-Control: no-cache, private\r\nDate:          Sun, 23 Jul 2023 22:15:40 GMT\r\nLocation:      http://127.0.0.1:8000/students/assignments/view/42/MTH001\r\n\r\n<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"refresh\" content=\"0;url=\'http://127.0.0.1:8000/students/assignments/view/42/MTH001\'\" />\n\n        <title>Redirecting to http://127.0.0.1:8000/students/assignments/view/42/MTH001</title>\n    </head>\n    <body>\n        Redirecting to <a href=\"http://127.0.0.1:8000/students/assignments/view/42/MTH001\">http://127.0.0.1:8000/students/assignments/view/42/MTH001</a>.\n    </body>\n</html>', 0, '2023-07-23 22:15:40'),
(15, 39, 'Assignment MTH001 warning!', 'Your grades for semester Mechanical Engineering - First Year has been added!Your grades for semester Mechanical Engineering - First Year has been added!', 2, 'HTTP/1.0 302 Found\r\nCache-Control: no-cache, private\r\nDate:          Sun, 23 Jul 2023 22:15:40 GMT\r\nLocation:      http://127.0.0.1:8000/students/assignments/view/42/MTH001\r\n\r\n<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"refresh\" content=\"0;url=\'http://127.0.0.1:8000/students/assignments/view/42/MTH001\'\" />\n\n        <title>Redirecting to http://127.0.0.1:8000/students/assignments/view/42/MTH001</title>\n    </head>\n    <body>\n        Redirecting to <a href=\"http://127.0.0.1:8000/students/assignments/view/42/MTH001\">http://127.0.0.1:8000/students/assignments/view/42/MTH001</a>.\n    </body>\n</html>', 0, '2023-07-23 22:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `student_semesters`
--

CREATE TABLE `student_semesters` (
  `id` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `default_grade` int(11) NOT NULL,
  `information` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT 0,
  `started` timestamp NOT NULL DEFAULT current_timestamp(),
  `ended` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_semesters`
--

INSERT INTO `student_semesters` (`id`, `student`, `year`, `grade`, `default_grade`, `information`, `title`, `is_done`, `started`, `ended`) VALUES
(16, 1, 2, 1, 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year', 'Mechanical Engineering - First Year', 0, '2022-11-09 13:00:00', '2022-11-30 13:00:00'),
(22, 1, 3, 1400, 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year', 'Mechanical Engineering - First Year', 1, '2022-11-09 13:00:00', '2022-11-30 13:00:00'),
(23, 1, 7, 700, 750, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year', 'Mechanical Engineering - Second Year - 1st Term', 1, '2022-11-09 13:00:00', '2022-11-30 13:00:00'),
(24, 1, 8, 650, 750, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year', 'Mechanical Engineering - First Year', 1, '2022-11-09 13:00:00', '2022-11-30 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT 'default/engineering.png',
  `department` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `title`, `icon`, `department`, `year`, `code`, `reference`, `information`, `created_at`, `updated_at`) VALUES
(1, 'Maths', 'defaults/engineering.png', 1, 2, 'MA101', 'uploads/lectures/videos/1667260157_63605efde8fab_ptm9wbasya.mp4', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-28 21:48:31', '2022-10-28 21:48:31'),
(2, 'Physics', 'defaults/engineering.png', 1, 2, 'PHY101', 'uploads/subject_reference/1667912462_636a530e08c69_7diay3ebpw.jpeg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-29 02:16:45', '2022-11-08 11:01:02'),
(3, 'Machine', 'defaults/engineering.png', 1, 2, 'MACH217', 'uploads/subject_reference/1667021264_635cb9d041b01_8x9jplxlfb.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-29 03:27:44', '2022-10-29 03:27:44'),
(4, 'Thermodynamics', 'defaults/engineering.png', 1, 3, 'THER109', 'uploads/subject_reference/1667105009_635e00f196b5d_amkz93okgf.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-30 02:43:29', '2022-10-30 02:43:29'),
(5, 'Fluid', 'defaults/engineering.png', 1, 3, 'FLUI262', 'uploads/subject_reference/1667106162_635e057231261_ijj5s01vx8.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-10-30 03:02:42', '2022-10-30 03:02:42'),
(6, 'Airplane Sturcture Principles', 'defaults/engineering.png', 1, 3, 'ASP101', 'uploads/subject_reference/1667646901_636645b56a8e4_a4vbp01w7p.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 09:15:01', '2022-11-05 09:15:01'),
(7, 'Plane Motors', 'defaults/engineering.png', 1, 3, 'PM101', 'uploads/subject_reference/1667654121_636661e96d2ad_iq3hgh6r72.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:15:21', '2022-11-05 11:15:21'),
(8, 'Aircraft Design', 'defaults/engineering.png', 1, 2, 'ACRD101', 'uploads/subject_reference/1667654210_6366624269142_lspt1ak3qo.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:16:50', '2022-11-05 11:16:50'),
(9, 'High-Speed Aerodynamic', 'defaults/engineering.png', 1, 2, 'HSAE101', 'uploads/subject_reference/1667654257_636662718744c_evlzwi7ow2.pdf', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-11-05 11:17:37', '2022-11-05 11:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `subject_grades`
--

CREATE TABLE `subject_grades` (
  `id` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `oral` int(11) NOT NULL,
  `final` int(11) NOT NULL,
  `midterm` int(11) NOT NULL,
  `assignments` int(11) NOT NULL,
  `quizzes` int(11) NOT NULL,
  `lab` int(11) NOT NULL,
  `smart` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject_grades`
--

INSERT INTO `subject_grades` (`id`, `subject`, `total`, `oral`, `final`, `midterm`, `assignments`, `quizzes`, `lab`, `smart`) VALUES
(1, 1, 240, 15, 150, 10, 20, 15, 15, 15),
(2, 2, 200, 10, 150, 10, 10, 5, 10, 5),
(3, 3, 130, 15, 22, 20, 30, 16, 10, 17),
(4, 5, 241, 22, 150, 22, 22, 15, 10, 0),
(5, 6, 340, 10, 300, 10, 10, 3, 2, 5),
(6, 8, 150, 5, 100, 20, 5, 5, 5, 10),
(7, 9, 150, 5, 100, 20, 5, 10, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `subject_summary`
--

CREATE TABLE `subject_summary` (
  `id` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `chapter` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT 0,
  `quick_preview` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject_summary`
--

INSERT INTO `subject_summary` (`id`, `subject`, `chapter`, `student`, `year`, `file`, `private`, `quick_preview`, `description`, `created_at`, `updated_at`) VALUES
(3, 2, 4, 1, 2, 'uploads/student_summary/1689239345_64afbf31b6247_amfb74ss8i.pdf', 1, 'https://getbootstrap.com/docs/4.1/content/tables/new', 'new update Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-07-11 16:56:48', '2023-07-13 06:09:05'),
(4, 2, 13, 39, 2, 'uploads/student_summary/1689239345_64afbf31b6247_amfb74ss8i.pdf', 1, 'https://getbootstrap.com/docs/4.1/content/tables/new', 'new update Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-07-11 16:56:48', '2023-07-13 06:09:05'),
(7, 2, 13, 39, 2, 'uploads/student_summary/1689239345_64afbf31b6247_amfb74ss8i.pdf', 1, 'https://getbootstrap.com/docs/4.1/content/tables/new', 'new update Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-07-11 16:56:48', '2023-07-13 06:09:05'),
(8, 1, 10, 1, 2, 'uploads/student_summary/1689266138_64b027daae23f_kmg3x5y5bd.pdf', 0, 'https://www.facebook.com/', '4 تشيرت ب 499 جنيه لفترة محدودة جدا 🔥\r\n• علشان ميكونش الشغل والحر كمان عليك، وفرنالك تشيرت بأجود أنواع الأقمشة اللي هتريحك طول اليوم وخامة قطن 100% وجودة لا يعلي عليها 👌\r\n• وأسعارنا كلها على قد الايد، يعني راحة وتوفير، فلو حابب تعرف السعر تواصل معانا أو أكتب مهتم وهنتواصل معاك بكل التفاصيل 💙', '2023-07-13 13:35:38', '2023-07-13 13:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `teaching_staff`
--

CREATE TABLE `teaching_staff` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `professor` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0->prof\r\n1->assistant',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teaching_staff`
--

INSERT INTO `teaching_staff` (`id`, `year`, `subject`, `professor`, `type`, `created_at`, `updated_at`) VALUES
(12, 2, 1, 2, 0, '2023-08-04 16:17:49', '2023-08-04 16:17:49'),
(13, 2, 1, 12, 0, '2023-08-04 16:17:49', '2023-08-04 16:17:49'),
(14, 2, 3, 12, 0, '2023-08-04 16:17:49', '2023-08-04 16:17:49');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id`, `year`, `day`, `text`, `event`, `start`, `end`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 'Maths', 'Exam', '15:54:00', '14:54:00', '2023-07-15 17:25:10', '2023-08-04 16:14:12'),
(2, 2, 1, 'Physics', 'Section', '06:02:00', '20:48:00', '2023-07-15 17:25:10', '2023-07-23 16:23:04'),
(3, 2, 1, 'Lab', 'Section', '16:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(4, 2, 1, 'Smart Exam', 'New', '10:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(9, 2, 2, 'Maths', 'Section', '15:54:00', '14:54:00', '2023-07-15 17:25:10', '2023-08-04 16:14:18'),
(10, 2, 2, 'Physics', 'Section', '10:54:00', '14:42:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(11, 2, 2, 'Lab', 'Section', '16:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(15, 2, 4, 'Maths', 'Lecture', '15:54:00', '14:54:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(16, 2, 4, 'Smart Exam', 'New', '10:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(18, 2, 3, 'Physics', 'Section', '10:54:00', '14:42:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(19, 2, 3, 'Lab', 'Section', '16:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(20, 2, 3, 'Smart Exam', 'New', '10:54:00', '14:27:00', '2023-07-15 17:25:10', '2023-07-15 17:25:10'),
(22, 2, 5, 'New Event', 'Quiz', '12:26:00', '15:26:00', '2023-07-23 16:26:07', '2023-07-23 16:26:07');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_days`
--

CREATE TABLE `timetable_days` (
  `id` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `abbr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_days`
--

INSERT INTO `timetable_days` (`id`, `day`, `abbr`) VALUES
(1, 'Saturday', 'Sat'),
(2, 'Sunday', 'Sun'),
(3, 'Tuesday', 'Tue'),
(4, 'Wednesday', 'Wed'),
(5, 'Thursday', 'Thu');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'abdo', 'a@a.com', NULL, '$2y$10$II4kIidW.KxC5FhD7ioBH.sRJqBzcORhXEog9M3IKwRmGaqlp6uhK', NULL, '2023-06-29 20:04:32', '2023-06-29 20:04:32');

-- --------------------------------------------------------

--
-- Table structure for table `year_courses`
--

CREATE TABLE `year_courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `department` int(11) NOT NULL,
  `next_year` int(11) NOT NULL,
  `term_name` varchar(255) NOT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL,
  `grade` int(11) NOT NULL,
  `information` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `year_courses`
--

INSERT INTO `year_courses` (`id`, `title`, `department`, `next_year`, `term_name`, `start`, `end`, `grade`, `information`) VALUES
(2, 'Mechanical Engineering -  1st Year', 1, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(3, 'Mechanical Engineering -  1st Year', 1, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(7, 'Mechanical Engineering - 2nd Year', 1, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(8, 'Mechanical Engineering - 2nd Year', 1, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(12, 'Mechanical Engineering -  3rd Year', 1, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(13, 'Mechanical Engineering -  3rd Year', 1, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(14, 'Mechanical Engineering - 4th Year', 1, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(15, 'Mechanical Engineering - 4th Year', 1, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(16, 'Electrical Engineering -  1st Year', 2, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(17, 'Electrical Engineering -  1st Year', 2, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(18, 'Electrical Engineering - 2nd Year', 2, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(19, 'Electrical Engineering - 2nd Year', 2, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(20, 'Electrical Engineering -  3rd Year', 2, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(21, 'Electrical Engineering -  3rd Year', 2, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(22, 'Electrical Engineering - 4th Year', 2, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(23, 'Electrical Engineering - 4th Year', 2, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(24, 'Civil Engineering -  1st Year', 4, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(25, 'Civil Engineering -  1st Year', 4, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(26, 'Civil Engineering - 2nd Year', 4, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(27, 'Civil Engineering - 2nd Year', 4, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(28, 'Civil Engineering -  3rd Year', 4, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(29, 'Civil Engineering -  3rd Year', 4, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(30, 'Civil Engineering - 4th Year', 4, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(31, 'Civil Engineering - 4th Year', 4, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(32, 'Aerospace Engineering -  3rd Year', 3, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(33, 'Aerospace Engineering -  1st Year', 3, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(34, 'Aerospace Engineering -  1st Year', 3, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(35, 'Aerospace Engineering - 2nd Year', 3, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(36, 'Aerospace Engineering - 2nd Year', 3, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(37, 'Aerospace Engineering -  3rd Year', 3, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(38, 'Aerospace Engineering - 4th Year', 3, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(39, 'Aerospace Engineering - 4th Year', 3, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(40, 'Industrial Engineering -  3rd Year', 5, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(41, 'Industrial Engineering -  1st Year', 5, 2, '1st Term', '2022-11-16 16:40:35', '2023-06-14 21:00:00', 1500, 'Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year Mechanical Engineering - First Year'),
(42, 'Industrial Engineering -  1st Year', 5, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(43, 'Industrial Engineering - 2nd Year', 5, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(44, 'Industrial Engineering - 2nd Year', 5, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year'),
(45, 'Industrial Engineering -  3rd Year', 5, 3, '2nd Term', '2022-10-29 07:52:00', '2023-10-29 08:52:00', 1500, 'Mechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second TermMechanical Department - First Year - Second Term'),
(46, 'Industrial Engineering - 4th Year', 5, 2, '1st Term', '2023-05-17 14:47:00', '2024-10-10 14:48:00', 750, 'Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year Second Year'),
(47, 'Industrial Engineering - 4th Year', 5, 2, '2nd Term', '2023-05-10 14:48:00', '2024-05-10 14:48:00', 750, 'Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year Second YearSecond Year  Second YearSecond Year');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor` (`professor`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor` (`professor`),
  ADD KEY `year` (`year`),
  ADD KEY `assignments_ibfk_4` (`subject`),
  ADD KEY `course` (`course`);

--
-- Indexes for table `assignment_answers`
--
ALTER TABLE `assignment_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment` (`assignment`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `assignment_grade`
--
ALTER TABLE `assignment_grade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment` (`assignment`),
  ADD KEY `student` (`student`),
  ADD KEY `answer` (`answer`);

--
-- Indexes for table `assignment_warnings`
--
ALTER TABLE `assignment_warnings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment` (`assignment`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `course_grade`
--
ALTER TABLE `course_grade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course` (`course`),
  ADD KEY `semester` (`semester`),
  ADD KEY `student` (`student`),
  ADD KEY `subject` (`subject`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `course_lectures`
--
ALTER TABLE `course_lectures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course` (`course`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `professors`
--
ALTER TABLE `professors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department` (`department`);

--
-- Indexes for table `question_mcq`
--
ALTER TABLE `question_mcq`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question` (`question`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year` (`year`),
  ADD KEY `subject` (`subject`),
  ADD KEY `professor` (`professor`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz` (`quiz`);

--
-- Indexes for table `quiz_student_grade`
--
ALTER TABLE `quiz_student_grade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer` (`answer`),
  ADD KEY `student` (`student`),
  ADD KEY `quiz_student_grade_ibfk_3` (`quiz`),
  ADD KEY `question` (`question`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year` (`year`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `report_answer`
--
ALTER TABLE `report_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report` (`report`),
  ADD KEY `professor` (`professor`);

--
-- Indexes for table `sent_emails`
--
ALTER TABLE `sent_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year` (`year`),
  ADD KEY `department` (`department`);

--
-- Indexes for table `student_badges`
--
ALTER TABLE `student_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `badge` (`badge`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `student_notifications`
--
ALTER TABLE `student_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor` (`professor`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `student_semesters`
--
ALTER TABLE `student_semesters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year` (`year`),
  ADD KEY `student` (`student`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department` (`department`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `subject_grades`
--
ALTER TABLE `subject_grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject`);

--
-- Indexes for table `subject_summary`
--
ALTER TABLE `subject_summary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapter` (`chapter`),
  ADD KEY `subject` (`subject`),
  ADD KEY `student` (`student`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `teaching_staff`
--
ALTER TABLE `teaching_staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor` (`professor`),
  ADD KEY `subject` (`subject`),
  ADD KEY `year` (`year`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year` (`year`),
  ADD KEY `day` (`day`);

--
-- Indexes for table `timetable_days`
--
ALTER TABLE `timetable_days`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `year_courses`
--
ALTER TABLE `year_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department` (`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `assignment_answers`
--
ALTER TABLE `assignment_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `assignment_grade`
--
ALTER TABLE `assignment_grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `assignment_warnings`
--
ALTER TABLE `assignment_warnings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `course_grade`
--
ALTER TABLE `course_grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `course_lectures`
--
ALTER TABLE `course_lectures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `professors`
--
ALTER TABLE `professors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `question_mcq`
--
ALTER TABLE `question_mcq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `quiz_student_grade`
--
ALTER TABLE `quiz_student_grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `report_answer`
--
ALTER TABLE `report_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sent_emails`
--
ALTER TABLE `sent_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `student_badges`
--
ALTER TABLE `student_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student_notifications`
--
ALTER TABLE `student_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student_semesters`
--
ALTER TABLE `student_semesters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `subject_grades`
--
ALTER TABLE `subject_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subject_summary`
--
ALTER TABLE `subject_summary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teaching_staff`
--
ALTER TABLE `teaching_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `timetable_days`
--
ALTER TABLE `timetable_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `year_courses`
--
ALTER TABLE `year_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_3` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_4` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_5` FOREIGN KEY (`course`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignment_answers`
--
ALTER TABLE `assignment_answers`
  ADD CONSTRAINT `assignment_answers_ibfk_1` FOREIGN KEY (`assignment`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_answers_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`);

--
-- Constraints for table `assignment_grade`
--
ALTER TABLE `assignment_grade`
  ADD CONSTRAINT `assignment_grade_ibfk_1` FOREIGN KEY (`assignment`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_grade_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_grade_ibfk_3` FOREIGN KEY (`answer`) REFERENCES `assignment_answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignment_warnings`
--
ALTER TABLE `assignment_warnings`
  ADD CONSTRAINT `assignment_warnings_ibfk_1` FOREIGN KEY (`assignment`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_warnings_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`);

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_grade`
--
ALTER TABLE `course_grade`
  ADD CONSTRAINT `course_grade_ibfk_1` FOREIGN KEY (`course`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_grade_ibfk_2` FOREIGN KEY (`semester`) REFERENCES `student_semesters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_grade_ibfk_3` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_grade_ibfk_4` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_grade_ibfk_5` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`);

--
-- Constraints for table `course_lectures`
--
ALTER TABLE `course_lectures`
  ADD CONSTRAINT `course_lectures_ibfk_1` FOREIGN KEY (`course`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `professors`
--
ALTER TABLE `professors`
  ADD CONSTRAINT `professors_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question_mcq`
--
ALTER TABLE `question_mcq`
  ADD CONSTRAINT `question_mcq_ibfk_1` FOREIGN KEY (`question`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quizzes_ibfk_2` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quizzes_ibfk_3` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_student_grade`
--
ALTER TABLE `quiz_student_grade`
  ADD CONSTRAINT `quiz_student_grade_ibfk_1` FOREIGN KEY (`answer`) REFERENCES `question_mcq` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_student_grade_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_student_grade_ibfk_3` FOREIGN KEY (`quiz`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_student_grade_ibfk_4` FOREIGN KEY (`question`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report_answer`
--
ALTER TABLE `report_answer`
  ADD CONSTRAINT `report_answer_ibfk_1` FOREIGN KEY (`report`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_answer_ibfk_2` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_badges`
--
ALTER TABLE `student_badges`
  ADD CONSTRAINT `student_badges_ibfk_1` FOREIGN KEY (`badge`) REFERENCES `badges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_badges_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_notifications`
--
ALTER TABLE `student_notifications`
  ADD CONSTRAINT `student_notifications_ibfk_1` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_notifications_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_semesters`
--
ALTER TABLE `student_semesters`
  ADD CONSTRAINT `student_semesters_ibfk_1` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_semesters_ibfk_2` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subject_grades`
--
ALTER TABLE `subject_grades`
  ADD CONSTRAINT `subject_grades_ibfk_1` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subject_summary`
--
ALTER TABLE `subject_summary`
  ADD CONSTRAINT `subject_summary_ibfk_1` FOREIGN KEY (`chapter`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_summary_ibfk_2` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_summary_ibfk_3` FOREIGN KEY (`student`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_summary_ibfk_4` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teaching_staff`
--
ALTER TABLE `teaching_staff`
  ADD CONSTRAINT `teaching_staff_ibfk_1` FOREIGN KEY (`professor`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teaching_staff_ibfk_2` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teaching_staff_ibfk_3` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`year`) REFERENCES `year_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`day`) REFERENCES `timetable_days` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `year_courses`
--
ALTER TABLE `year_courses`
  ADD CONSTRAINT `year_courses_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
