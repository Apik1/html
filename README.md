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
