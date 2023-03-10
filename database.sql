USE [master]
GO
/****** Object:  Database [RecipeHubDatabase]    Script Date: 2/16/2023 5:17:08 PM ******/
CREATE DATABASE [RecipeHubDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RecipeHubDatabase', FILENAME = N'C:\Users\bru\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\RecipeHubDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'RecipeHubDatabase_log', FILENAME = N'C:\Users\bru\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\RecipeHubDatabase.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [RecipeHubDatabase] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RecipeHubDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RecipeHubDatabase] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET ANSI_NULLS ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET ANSI_PADDING ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET ARITHABORT ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [RecipeHubDatabase] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [RecipeHubDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RecipeHubDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RecipeHubDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET RECOVERY FULL 
GO
ALTER DATABASE [RecipeHubDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [RecipeHubDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RecipeHubDatabase] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RecipeHubDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RecipeHubDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RecipeHubDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RecipeHubDatabase] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [RecipeHubDatabase] SET QUERY_STORE = OFF
GO
USE [RecipeHubDatabase]
GO
/****** Object:  Table [dbo].[Ingredients]    Script Date: 2/16/2023 5:17:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingredients](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecipeId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	[MeasuringUnit] [nvarchar](20) NOT NULL,
	[ClassName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recipes]    Script Date: 2/16/2023 5:17:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recipes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[ImageString] [nvarchar](500) NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Steps]    Script Date: 2/16/2023 5:17:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Steps](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Text] [nvarchar](500) NOT NULL,
	[RecipeId] [int] NOT NULL,
	[Index] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/16/2023 5:17:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](20) NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[PasswordHash] [nvarchar](100) NOT NULL,
	[UserImage] [nvarchar](150) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Ingredients] ON 

INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17030, 20011, N'milk', 2, N'dL', N'fa-solid fa-cow')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17031, 20011, N'eggs', 1, N'pcs', N'fa-solid fa-egg')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17032, 20011, N'flour', 250, N'g', N'fa-solid fa-wheat-awn')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17033, 20012, N'flour', 300, N'g', N'fa-solid fa-wheat-awn')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17034, 20012, N'pepperoni', 150, N'g', N'fa-solid fa-cookie')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17035, 20012, N' yeast', 1, N'pcs', N'fa-solid fa-bread-slice')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17036, 20012, N'water', 1, N'dL', N'fa-solid fa-whiskey-glass')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17037, 20012, N' tomato sauce', 1, N'dL', N'fa-solid fa-jar')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17038, 20013, N'cheese', 100, N'g', N'fa-solid fa-cheese')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17039, 20013, N'pork', 100, N'g', N'fa-solid fa-bacon')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17040, 20013, N' tomato', 1, N'pcs', N'fa-solid fa-apple-whole')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17041, 20014, N'eggs', 3, N'pcs', N'fa-solid fa-egg')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17042, 20015, N'pasta', 300, N'g', N'fa-solid fa-plate-wheat')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17043, 20015, N' tomato sauce', 1, N'dL', N'fa-solid fa-jar')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17044, 20015, N'water', 400, N'dL', N'fa-solid fa-whiskey-glass')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17045, 20016, N'milk', 1, N'dL', N'fa-solid fa-cow')
INSERT [dbo].[Ingredients] ([Id], [RecipeId], [Name], [Quantity], [MeasuringUnit], [ClassName]) VALUES (17046, 20016, N'cereal', 120, N'g', N'fa-solid fa-bowl-rice')
SET IDENTITY_INSERT [dbo].[Ingredients] OFF
GO
SET IDENTITY_INSERT [dbo].[Recipes] ON 

INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20011, N'PANCAKES', N'VERY DELICIOUS PANCAKES.', N'Assets/RecipeImages/253c0ff.jpg', 5002)
INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20012, N'PIZZA', N'THE BEST PIZZA IN THE UNIVERSE.
FOLLOW ME FOR MORE RECIPES!', N'Assets/RecipeImages/fb959d0.jpg', 5002)
INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20013, N'AWESOME BURGER', N'A BURGER WITH TOMATO, CHEESE,... EVERYTHING A GOOD BURGER NEEDS!', N'Assets/RecipeImages/100caff.jpg', 6002)
INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20014, N'EGGS', N'SIPLE EGGS.', N'Assets/RecipeImages/d16abcf.jpg', 6002)
INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20015, N'PASTA', N'ITALLIAN PASTA', N'Assets/RecipeImages/34e9c61.jpg', 6002)
INSERT [dbo].[Recipes] ([Id], [Name], [Description], [ImageString], [UserId]) VALUES (20016, N'CEREAL', N'AVERAGE CEREAL.', N'Assets/RecipeImages/2862cb5.jpg', 6002)
SET IDENTITY_INSERT [dbo].[Recipes] OFF
GO
SET IDENTITY_INSERT [dbo].[Steps] ON 

INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13034, N'MIX ALL OF THE INGREDIENTS TOGETHER.', 20011, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13035, N'FRY THE PANCAKES.', 20011, 1)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13036, N'DOUGH: 
MIX YEAST WITH WATER, PUT A TABLESPOON OF SUGAR AND COVER FOR 15 MINUTES.', 20012, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13037, N'MIX THE YEAST WITH FLOUR AND ADD A LITTLE BIT OF SALT!', 20012, 1)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13038, N'STRETCH THE DOUGH IN A FRYING PAN.', 20012, 2)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13039, N'PUT THE TOPPINGS ON:; TOMATO SAUCE, PEPERONI, CHEESE, ETC', 20012, 3)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13040, N'BAKE THE PIZZA IN THE OVEN FOR 15 MINUTES.', 20012, 4)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13041, N'PREPARE BUNS OF YOUR CHOICE.', 20013, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13042, N'PUT EVERYTHING IN.', 20013, 1)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13043, N'ENJOY!!!!!', 20013, 2)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13044, N'BREAK THE EGGS IN THE PAN.', 20014, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13045, N'FLIP THEM WHEN READY.', 20014, 1)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13046, N'SERVE THE EGSS ON THE PLATE.', 20014, 2)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13047, N'BOIL PASTA IN SALTED BOILING WATER.', 20015, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13048, N'SERVE IT ON A PLATE AND MIX IT WITH TOMATO SAUCE!', 20015, 1)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13049, N'PUT THE CEREAL IN A BOWL.', 20016, 0)
INSERT [dbo].[Steps] ([Id], [Text], [RecipeId], [Index]) VALUES (13050, N'ADD MILK !!', 20016, 1)
SET IDENTITY_INSERT [dbo].[Steps] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [UserName], [Email], [PasswordHash], [UserImage]) VALUES (5002, N'bruno123', N'bruno.filip@gmail.com', N'f707fdda7c874ff49ebfb2c88a2860c5ff4ce3d94a21efb76566ad0f92c9ad57', N'Assets/UserImages/992260a.jpg')
INSERT [dbo].[Users] ([Id], [UserName], [Email], [PasswordHash], [UserImage]) VALUES (6002, N'alex7', N'alex.al@gmail.com', N'8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414', N'Assets/UserImages/99e47e1.jpg')
INSERT [dbo].[Users] ([Id], [UserName], [Email], [PasswordHash], [UserImage]) VALUES (7002, N'LIAM8', N'liam.8@gmail.com', N'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', N'/assets/images/default.png')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Ingredients]  WITH CHECK ADD FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Steps]  WITH CHECK ADD FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
USE [master]
GO
ALTER DATABASE [RecipeHubDatabase] SET  READ_WRITE 
GO
