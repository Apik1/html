start here
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth0 Management Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8f9fa;
            color: #333;
        }

        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header h1 {
            font-size: 1.5rem;
            font-weight: 600;
        }

        .user-menu {
            position: relative;
        }

        .user-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .user-icon:hover {
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
            transform: translateY(-2px);
        }

        .user-icon svg {
            width: 20px;
            height: 20px;
        }

        .dropdown-menu {
            position: absolute;
            top: 50px;
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            min-width: 150px;
            display: none;
            z-index: 1000;
            overflow: hidden;
        }

        .dropdown-menu.show {
            display: block;
            animation: fadeInDown 0.3s ease;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .dropdown-item {
            padding: 12px 16px;
            color: #333;
            text-decoration: none;
            display: block;
            transition: background-color 0.2s;
        }

        .dropdown-item:hover {
            background-color: #f8f9fa;
        }

        /* Main Container */
        .container {
            display: flex;
            min-height: calc(100vh - 80px);
        }

        /* Sidebar */
        .sidebar {
            width: 250px;
            background: white;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            padding: 2rem 0;
        }

        .nav-item {
            padding: 1rem 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .nav-item:hover {
            background: #f8f9fa;
            border-left-color: #667eea;
        }

        .nav-item.active {
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
            border-left-color: #667eea;
            color: #667eea;
            font-weight: 600;
        }

        .nav-icon {
            width: 20px;
            height: 20px;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 2rem;
        }

        .content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .content-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2d3748;
        }

        .options-menu {
            position: relative;
        }

        .options-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .options-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .options-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            min-width: 180px;
            display: none;
            z-index: 100;
            overflow: hidden;
        }

        .options-dropdown.show {
            display: block;
            animation: fadeInDown 0.3s ease;
        }

        .options-item {
            padding: 12px 16px;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .options-item:hover {
            background-color: #f8f9fa;
        }

        /* Connections List */
        .connections-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        .connection-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }

        .connection-item:last-child {
            border-bottom: none;
        }

        .connection-item:hover {
            background: #f8f9fa;
            transform: translateX(5px);
        }

        .connection-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .connection-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .connection-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
        }

        .connection-status {
            font-size: 0.9rem;
            color: #718096;
        }

        .update-btn {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(72, 187, 120, 0.3);
        }

        .update-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #718096;
        }

        .empty-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 1rem;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <h1>Auth0 Management Dashboard</h1>
        <div class="user-menu">
            <div class="user-icon" onclick="toggleUserMenu()">
                <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="dropdown-menu" id="userDropdown">
                <a href="#" class="dropdown-item">Profile</a>
                <a href="#" class="dropdown-item">Settings</a>
                <a href="#" class="dropdown-item">Logout</a>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="container">
        <!-- Sidebar -->
        <nav class="sidebar">
            <div class="nav-item active" onclick="navigateTo('connections')">
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
                Connections
            </div>
            <div class="nav-item" onclick="navigateTo('users')">
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Users
            </div>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-header">
                <h2 class="content-title">Connections</h2>
                <div class="options-menu">
                    <button class="options-btn" onclick="toggleOptionsMenu()">...</button>
                    <div class="options-dropdown" id="optionsDropdown">
                        <div class="options-item" onclick="createNewUser()">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
                            </svg>
                            Create New User
                        </div>
                        <div class="options-item">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                            </svg>
                            Import Connections
                        </div>
                        <div class="options-item">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                            Export Data
                        </div>
                    </div>
                </div>
            </div>

            <!-- Connections List -->
            <div class="connections-container" id="connectionsContainer">
                <!-- Sample connections will be populated by JavaScript -->
            </div>
        </main>
    </div>

    <script>
        // Sample connections data
        const connections = [
            { name: "Google OAuth", type: "Social", status: "Active" },
            { name: "Microsoft AD", type: "Enterprise", status: "Active" },
            { name: "GitHub", type: "Social", status: "Inactive" },
            { name: "LDAP Connection", type: "Enterprise", status: "Active" },
            { name: "Facebook", type: "Social", status: "Active" }
        ];

        // Navigation functions
        function navigateTo(page) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            event.target.classList.add('active');
            
            // Update page title
            document.querySelector('.content-title').textContent = 
                page === 'connections' ? 'Connections' : 'Users';
            
            // For now, both pages show the same content
            renderConnections();
        }

        // Toggle user dropdown menu
        function toggleUserMenu() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('show');
        }

        // Toggle options dropdown menu
        function toggleOptionsMenu() {
            const dropdown = document.getElementById('optionsDropdown');
            dropdown.classList.toggle('show');
        }

        // Create new user function
        function createNewUser() {
            alert('Create New User functionality will be implemented here');
            toggleOptionsMenu();
        }

        // Update certificate function
        function updateCertificate(connectionName) {
            alert(`Update certificate for ${connectionName} - functionality will be implemented here`);
        }

        // Render connections list
        function renderConnections() {
            const container = document.getElementById('connectionsContainer');
            
            if (connections.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <svg class="empty-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <h3>No connections found</h3>
                        <p>Create your first connection to get started</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = connections.map(connection => `
                <div class="connection-item">
                    <div class="connection-info">
                        <div class="connection-icon">
                            ${connection.name.charAt(0)}
                        </div>
                        <div>
                            <div class="connection-name">${connection.name}</div>
                            <div class="connection-status">${connection.type} • ${connection.status}</div>
                        </div>
                    </div>
                    <button class="update-btn" onclick="updateCertificate('${connection.name}')">
                        Update Certificate
                    </button>
                </div>
            `).join('');
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            const userMenu = document.getElementById('userDropdown');
            const optionsMenu = document.getElementById('optionsDropdown');
            
            if (!event.target.closest('.user-menu')) {
                userMenu.classList.remove('show');
            }
            
            if (!event.target.closest('.options-menu')) {
                optionsMenu.classList.remove('show');
            }
        });

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderConnections();
        });
    </script>
</body>
</html>
