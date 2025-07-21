    
        // Sample sales data from previous table
        const salesData = [
            { emporium: "ग्वालियर", target: 80, sales: 70, percentage: 87.5 },
            { emporium: "मंदसौर", target: 20, sales: 0, percentage: 0.0 }
        ];

        document.addEventListener('DOMContentLoaded', function () {
            try {
                const notificationItems = document.querySelectorAll('.notification-item');
                const modal = new bootstrap.Modal(document.getElementById('notificationModal'), { backdrop: true });
                const modalTitle = document.getElementById('modal-title');
                const modalDesc = document.getElementById('modal-desc');
                const modalDemand = document.getElementById('modal-demand');
                const modalTime = document.getElementById('modal-time');
                const modalSalesData = document.getElementById('modal-sales-data');
                const notificationList = document.getElementById('notification-list');
                let currentNotification = null;

                // Function to populate modal
                function populateModal(item) {
                    try {
                        currentNotification = item; // Store the clicked item
                        const title = item.querySelector('.notification-title')?.innerHTML || 'N/A';
                        const desc = item.querySelector('.notification-desc')?.textContent || 'No description';
                        const demand = item.dataset?.demandNumber || 'N/A';
                        const time = item.querySelector('.notification-time')?.textContent || 'Unknown time';
                        const emporium = item.dataset?.emporium || 'None';
                        const isWarning = item.classList.contains('warning');
                        const isInfo = item.classList.contains('info');

                        if (modalTitle) modalTitle.innerHTML = title;
                        if (modalDesc) modalDesc.textContent = desc;
                        if (modalDemand) {
                            modalDemand.textContent = demand;
                            modalDemand.className = 'badge';
                            modalDemand.classList.add(isWarning ? 'bg-warning' : isInfo ? 'bg-info' : 'bg-secondary');
                        }
                        if (modalTime) modalTime.textContent = time;

                        // Display sales data if emporium matches
                        if (modalSalesData) {
                            modalSalesData.innerHTML = '';
                            if (emporium !== 'None') {
                                const data = salesData.find(row => row.emporium.includes(emporium));
                                if (data) {
                                    const percentageClass = data.percentage >= 50 ? 'success' :
                                        data.percentage >= 30 ? 'warning' : 'danger';
                                    modalSalesData.innerHTML = `
                                        <h6><i class="fas fa-chart-line me-2 text-success"></i>Sales Data for ${emporium}</h6>
                                        <table class="sales-table">
                                            <thead>
                                                <tr>
                                                    <th>Target (Lakhs)</th>
                                                    <th>Sales (Lakhs)</th>
                                                    <th>Percentage Fulfillment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>${data.target}</td>
                                                    <td>${data.sales}</td>
                                                    <td class="${percentageClass}">${data.percentage}%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    `;
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error populating modal:', error);
                    }
                }

                // Click event
                notificationItems.forEach(item => {
                    item.addEventListener('click', function () {
                        try {
                            populateModal(this);
                            modal.show();
                        } catch (error) {
                            console.error('Error opening modal:', error);
                        }
                    });
                });

                // Mark All Read button
                const markReadBtn = document.getElementById('mark-read-btn');
                if (markReadBtn) {
                    markReadBtn.addEventListener('click', function () {
                        try {
                            notificationItems.forEach(item => {
                                item.classList.remove('warning', 'info');
                                item.classList.add('read');
                            });
                        } catch (error) {
                            console.error('Error marking all read:', error);
                        }
                    });
                }

                // Dismiss Notification button
                const dismissBtn = document.getElementById('dismiss-notification');
                if (dismissBtn) {
                    dismissBtn.addEventListener('click', function () {
                        try {
                            if (currentNotification && notificationList && notificationList.contains(currentNotification)) {
                                notificationList.removeChild(currentNotification);
                                modal.hide();
                                currentNotification = null;
                            } else {
                                console.warn('No valid notification to dismiss or notification list not found');
                            }
                        } catch (error) {
                            console.error('Error dismissing notification:', error);
                        }
                    });
                }
            } catch (error) {
                console.error('Script initialization error:', error);
            }
        });

    // Color Badge for table 

        document.addEventListener('DOMContentLoaded', function () {
            const table = document.querySelector('#salesModal .modal-table tbody');
            const rows = table.querySelectorAll('tr:not(:last-child)'); // Exclude the total row

            rows.forEach(row => {
                const percentageCell = row.querySelector('td:last-child');
                const percentageText = percentageCell.textContent.trim();
                const percentage = parseFloat(percentageText.replace('%', ''));

                if (isNaN(percentage)) {
                    // Handle rows with invalid/missing percentage (not set)
                    row.classList.add('default-row'); // Optional: can apply a default style if needed
                } else if (percentage >= 50) {
                    row.classList.add('success-row');
                } else if (percentage >= 30 && percentage <= 49) {
                    row.classList.add('warning-row');
                } else if (percentage >= 0 && percentage <= 29) {
                    row.classList.add('danger-row');
                }
            });
        });



        function toggleUserTitle() {
            const userTitle = document.getElementById('user-title');
            if (userTitle.textContent === 'Managing Director') {
                userTitle.textContent = 'Principal Secretary';
                window.location.href = 'Index2.html'; // Redirect to the Managing Director page
            } else {
                userTitle.textContent = 'Managing Director';
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            // Initialize anime.js timeline
            const timeline = anime.timeline({
                easing: 'easeOutExpo',
                duration: 0
            });

            // Animate KPI cards
            const kpiCards = document.querySelectorAll('.kpi-card');
            kpiCards.forEach((card, index) => {
                timeline.add({
                    targets: card,
                    translateY: 0,
                    opacity: 1,
                    delay: index * 100
                });
            });

            // Animate dashboard cards
            const dashboardCards = document.querySelectorAll('.dashboard-card');
            dashboardCards.forEach((card, index) => {
                timeline.add({
                    targets: card,
                    scale: 1,
                    opacity: 1,
                    delay: index * 100
                });
            });

            // Animate notification items
            const notificationItems = document.querySelectorAll('.notification-item');
            notificationItems.forEach((item, index) => {
                timeline.add({
                    targets: item,
                    translateX: 0,
                    opacity: 1,
                    delay: index * 100
                });
            });

            // Animate modals on show
            const modals = ['targetsModal', 'productionModal', 'salesModal', 'ordersModal', 'stockModal', 'lowStockModal', 'modalGwaliorKambal', 'modalIndoreKhadi', 'modalUjjainPolytextile', 'modalDewasCharm', 'modalGwaliorTelghani'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.addEventListener('show.bs.modal', () => {
                        anime({
                            targets: '.modal-content',
                            scale: [0.9, 1],
                            opacity: [0, 1],
                            duration: 500,
                            easing: 'easeOutExpo'
                        });
                    });
                }
            });

            // Counter animations for KPI values
            animateValue('production-value', 0, 710, 1500);
            animateValue('sales-value', 0, 292, 1500);
            animateValue('orders-value', 0, 5, 1500);
            animateValue('stock-value', 0, 1064, 1500);
            animateValue('total-orders', 0, 1000, 1500);

            function animateValue(id, start, end, duration) {
                const obj = document.getElementById(id);
                if (!obj) return;
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const value = Math.floor(progress * (end - start) + start);
                    obj.innerHTML = value.toLocaleString('en-IN');
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }

            // Data for different financial years
            const dataByFinancialYear = {
                '2024-25': {
                    finishedProducts: {
                        monthly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [1100, 900, 700, 600, 550]
                        },
                        quarterly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [3300, 2700, 2100, 1800, 1650]
                        },
                        yearly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [13200, 10800, 8400, 7200, 6600]
                        }
                    },
                    belowFinishedProducts: {
                        monthly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [18, 24, 24, 25, 26]
                        },
                        quarterly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [54, 72, 72, 75, 78]
                        },
                        yearly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [216, 288, 288, 300, 312]
                        }
                    },
                    emporiumSales: {
                        quantity: {
                            labels: ['Jawahar Chowk', 'MP Nagar', 'Morena', 'Gwalior', 'Indore'],
                            data: [1150, 900, 800, 600, 550]
                        },
                        revenue: {
                            labels: ['Jawahar Chowk', 'MP Nagar', 'Morena', 'Gwalior', 'Indore'],
                            data: [1150000, 900000, 800000, 600000, 550000]
                        }
                    },
                    belowEmporiumSales: {
                        quantity: {
                            labels: ['Morena', 'Bhopal Hot', 'Pachmarhi', 'Ravishankar Nagar', 'Narmadapuram'],
                            data: [10, 0, 0, 0, 0]
                        },
                        revenue: {
                            labels: ['Morena', 'Bhopal Hot', 'Pachmarhi', 'Ravishankar Nagar', 'Narmadapuram'],
                            data: [9600, 0, 0, 0, 0]
                        }
                    },
                    orderVsSupply: {
                        byDepartment: { labels: ['Supplied (Other Dept)', 'Pending (Other Dept)'], data: [750, 180] },
                        bySelf: { labels: ['Supplied (Self)', 'Pending (Self)'], data: [400, 280] }
                    },
                    kpi: {
                        productionValue: 568,
                        salesValue: 233.6,
                        ordersValue: 720,
                        stockValue: 851.2
                    }
                },
                '2025-26': {
                    finishedProducts: {
                        monthly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [1064, 980, 750, 620, 580]
                        },
                        quarterly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [3750, 2940, 2250, 1860, 1740]
                        },
                        yearly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [15000, 11760, 9000, 7440, 6960]
                        }
                    },

                    vindhyavalley: {
                        monthly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [1064, 980, 750, 620, 580]
                        },
                        quarterly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [3750, 2940, 2250, 1860, 1740]
                        },
                        yearly: {
                            labels: ['Gents Kurta', 'Saree Kosa Block Print', 'Gents Shirt White FS', 'Woolen Jacket', 'Kurta Regular'],
                            data: [500, 2176, 2100, 744, 2960]
                        }
                    },

                    categorywisesale: {
                        monthly: {
                            labels: ['Cotton', 'Woolen', 'Silk', 'Leather', 'Other'],
                            data: [1064, 980, 750, 620, 580]
                        },
                        quarterly: {
                            labels: ['Cotton', 'Woolen', 'Silk', 'Leather', 'Other'],
                            data: [3750, 2940, 2250, 1860, 1740]
                        },
                        yearly: {
                            labels: ['Cotton', 'Woolen', 'Silk', 'Leather', 'Other'],
                            data: [19000, 10760, 30000, 3000, 15000]
                        }
                    },


                    belowFinishedProducts: {
                        monthly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [22, 30, 30, 31, 33]
                        },
                        quarterly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [66, 90, 90, 93, 99]
                        },
                        yearly: {
                            labels: ['Tikamgarh Kambal', 'Chhindwara Kambal', 'Khargone Khadi', 'Maheshwar Silk', 'Indore Khadi'],
                            data: [264, 360, 360, 372, 396]
                        }
                    },
                    emporiumSales: {
                        quantity: {
                            labels: ['Jawahar Chowk', 'MP Nagar', 'Morena', 'Gwalior', 'Indore'],
                            data: [1250, 980, 875, 620, 580]
                        },
                        revenue: {
                            labels: ['Jawahar Chowk', 'MP Nagar', 'Morena', 'Gwalior', 'Indore'],
                            data: [1250000, 980000, 875000, 620000, 580000]
                        }
                    },
                    belowEmporiumSales: {
                        quantity: {
                            labels: ['Morena', 'Bhopal Hot', 'Pachmarhi', 'Ravishankar Nagar', 'Narmadapuram'],
                            data: [12, 15, 24, 35, 8]
                        },
                        revenue: {
                            labels: ['Morena', 'Bhopal Hot', 'Pachmarhi', 'Ravishankar Nagar', 'Narmadapuram'],
                            data: [12000, 15000, 24000, 35000, 8000]
                        }
                    },
                    orderVsSupply: {
                        byDepartment: { labels: ['Supplied (Other Dept)', 'Pending (Other Dept)'], data: [800, 200] },
                        bySelf: { labels: ['Supplied (Self)', 'Pending (Self)'], data: [450, 300] }
                    },
                    kpi: {
                        productionValue: 710,
                        salesValue: 292,
                        ordersValue: 5,
                        stockValue: 1064
                    }
                }
            };

            // Chart 1: Top 5 / Below 5 Finished Products Sales
            const finishedProductsCtx = document.getElementById('finishedProductsChart')?.getContext('2d');
            let finishedProductsChart;
            if (finishedProductsCtx) {
                finishedProductsChart = new Chart(finishedProductsCtx, {
                    type: 'bar',
                    data: {
                        labels: dataByFinancialYear['2025-26'].finishedProducts.yearly.labels,
                        datasets: [{
                            label: 'Quantity Produced (Nos)',
                            data: dataByFinancialYear['2025-26'].finishedProducts.yearly.data,
                            backgroundColor: ['rgba(52, 152, 219, 0.7)', 'rgba(155, 89, 182, 0.7)', 'rgba(52, 73, 94, 0.7)', 'rgba(39, 174, 96, 0.7)', 'rgba(241, 196, 15, 0.7)'],
                            borderColor: ['rgba(52, 152, 219, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(39, 174, 96, 1)', 'rgba(241, 196, 15, 1)'],
                            borderWidth: 1,
                            borderRadius: 6,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    afterLabel: function (context) {
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((context.raw / total) * 100);
                                        return `Percentage: ${percentage}% of total production`;
                                    }
                                }
                            },
                            datalabels: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Quantity (Nos)', font: { weight: 'bold' } },
                                grid: { color: 'rgba(0, 0, 0, 0.05)' }
                            },
                            x: { grid: { display: false } }
                        },
                        animation: { duration: 2000, easing: 'easeOutQuart' }
                    }
                });
            }


            // Chart 1: Top 5 / Below 5 Finished Products Sales
            const vindhyavalleyCtx = document.getElementById('vindhyavalleyChart')?.getContext('2d');
            let vindhyavalleyChart;
            if (vindhyavalleyCtx) {
                vindhyavalleyChart = new Chart(vindhyavalleyCtx, {
                    type: 'bar',
                    data: {
                        labels: dataByFinancialYear['2025-26'].vindhyavalley.yearly.labels,
                        datasets: [{
                            label: 'Quantity Produced (Nos)',
                            data: dataByFinancialYear['2025-26'].vindhyavalley.yearly.data,
                            backgroundColor: ['rgba(52, 152, 219, 0.7)', 'rgba(155, 89, 182, 0.7)', 'rgba(52, 73, 94, 0.7)', 'rgba(39, 174, 96, 0.7)', 'rgba(241, 196, 15, 0.7)'],
                            borderColor: ['rgba(52, 152, 219, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(39, 174, 96, 1)', 'rgba(241, 196, 15, 1)'],
                            borderWidth: 1,
                            borderRadius: 6,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    afterLabel: function (context) {
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((context.raw / total) * 100);
                                        return `Percentage: ${percentage}% of total production`;
                                    }
                                }
                            },
                            datalabels: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Quantity (Nos)', font: { weight: 'bold' } },
                                grid: { color: 'rgba(0, 0, 0, 0.05)' }
                            },
                            x: { grid: { display: false } }
                        },
                        animation: { duration: 2000, easing: 'easeOutQuart' }
                    }
                });
            }

            // Main category Wise Sales
            const categorywisesaleCtx = document.getElementById('categorywisesaleChart')?.getContext('2d');
            let categorywisesaleChart;
            if (categorywisesaleCtx) {
                vindhyavalleyChart = new Chart(categorywisesaleCtx, {
                    type: 'bar',
                    data: {
                        labels: dataByFinancialYear['2025-26'].categorywisesale.yearly.labels,
                        datasets: [{
                            label: 'Quantity Produced (Nos)',
                            data: dataByFinancialYear['2025-26'].categorywisesale.yearly.data,
                            backgroundColor: ['rgba(52, 152, 219, 0.7)', 'rgba(155, 89, 182, 0.7)', 'rgba(52, 73, 94, 0.7)', 'rgba(39, 174, 96, 0.7)', 'rgba(241, 196, 15, 0.7)'],
                            borderColor: ['rgba(52, 152, 219, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 73, 94, 1)', 'rgba(39, 174, 96, 1)', 'rgba(241, 196, 15, 1)'],
                            borderWidth: 1,
                            borderRadius: 6,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    afterLabel: function (context) {
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((context.raw / total) * 100);
                                        return `Percentage: ${percentage}% of total production`;
                                    }
                                }
                            },
                            datalabels: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Quantity (Nos)', font: { weight: 'bold' } },
                                grid: { color: 'rgba(0, 0, 0, 0.05)' }
                            },
                            x: { grid: { display: false } }
                        },
                        animation: { duration: 2000, easing: 'easeOutQuart' }
                    }
                });
            }


            // Chart 2: Top 5 / Below 5 Emporium Wise Sales
            const emporiumSalesCtx = document.getElementById('emporiumSalesChart')?.getContext('2d');
            let emporiumSalesChart;
            if (emporiumSalesCtx) {
                emporiumSalesChart = new Chart(emporiumSalesCtx, {
                    type: 'doughnut',
                    data: {
                        labels: dataByFinancialYear['2025-26'].emporiumSales.revenue.labels,
                        datasets: [{
                            label: 'Sales (₹)',
                            data: dataByFinancialYear['2025-26'].emporiumSales.revenue.data,
                            backgroundColor: ['rgba(231, 76, 60, 0.7)', 'rgba(243, 156, 18, 0.7)', 'rgba(46, 204, 113, 0.7)', 'rgba(52, 152, 219, 0.7)', 'rgba(155, 89, 182, 0.7)'],
                            borderColor: ['rgba(231, 76, 60, 1)', 'rgba(243, 156, 18, 1)', 'rgba(46, 204, 113, 1)', 'rgba(52, 152, 219, 1)', 'rgba(155, 89, 182, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'right' },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.label || '';
                                        const value = context.raw || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                        return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                                    }
                                }
                            },
                            datalabels: {
                                formatter: (value, ctx) => {
                                    const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                    return `${percentage}%`;
                                },
                                color: '#fff',
                                font: { weight: 'bold' }
                            }
                        },
                        cutout: '50%',
                        animation: {
                            animateScale: true, animateRotate: true,
                            duration: 1000,
                            easing: 'easeOutQuart' // Smooth easing for initial animation
                        },
                        elements: {
                            arc: {
                                hoverOffset: 20, // Larger offset for pronounced pop-out effect
                                shadowOffsetX: 8, // Enhanced shadow for 3D depth
                                shadowOffsetY: 8,
                                shadowBlur: 15,
                                shadowColor: 'rgba(0, 0, 0, 0.4)' // Stronger shadow
                            }
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true,
                            animationDuration: 300, // Smooth hover transition
                            onHover: (event, chartElement) => {
                                if (chartElement.length) {
                                    const element = chartElement[0];
                                    const dataset = ordervssupplyChart.data.datasets[element.datasetIndex];
                                    // Reset all segments
                                    dataset.borderWidth = dataset.borderWidth.map(() => 1);
                                    dataset.borderColor = dataset.borderColor.map((color, i) =>
                                        i === element.index ? 'rgba(255, 255, 255, 0.8)' : dataset.borderColor[i]
                                    );
                                    dataset.borderWidth[element.index] = 6; // Thicker glowing border
                                    ordervssupplyChart.update();
                                } else {
                                    // Reset to default when not hovering
                                    const dataset = ordervssupplyChart.data.datasets[0];
                                    dataset.borderWidth = dataset.borderWidth.map(() => 1);
                                    dataset.borderColor = ['rgba(46, 204, 113, 1)', 'rgba(231, 76, 60, 1)'];
                                    ordervssupplyChart.update();
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });

            }
      
        // Chart 3: Order vs Supply
        const ordervssupplyCtx = document.getElementById('ordervssupplyChart')?.getContext('2d');
        let ordervssupplyChart;
        if (ordervssupplyCtx) {
            ordervssupplyChart = new Chart(ordervssupplyCtx, {
                type: 'pie',
                data: {
                    labels: dataByFinancialYear['2025-26'].orderVsSupply.byDepartment.labels,
                    datasets: [{
                        label: 'Orders',
                        data: dataByFinancialYear['2025-26'].orderVsSupply.bySelf.data,
                        backgroundColor: ['rgba(46, 204, 113, 0.7)', 'rgba(231, 76, 60, 0.7)'],
                        borderColor: ['rgba(46, 204, 113, 1)', 'rgba(231, 76, 60, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'left' },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${value.toLocaleString('en-IN')} orders (${percentage}%)`;
                                }
                            }
                        },
                        datalabels: {
                            formatter: (value, ctx) => {
                                const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${percentage}%`;
                            },
                            color: '#fff',
                            font: { weight: 'bold' }
                        }
                    },
                    cutout: '50%',
                    animation: {
                        animateScale: true, animateRotate: true,
                        duration: 1000,
                        easing: 'easeOutQuart' // Smooth easing for initial animation
                    },
                    elements: {
                        arc: {
                            hoverOffset: 20, // Larger offset for pronounced pop-out effect
                            shadowOffsetX: 8, // Enhanced shadow for 3D depth
                            shadowOffsetY: 8,
                            shadowBlur: 15,
                            shadowColor: 'rgba(0, 0, 0, 0.4)' // Stronger shadow
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true,
                        animationDuration: 300, // Smooth hover transition
                        onHover: (event, chartElement) => {
                            if (chartElement.length) {
                                const element = chartElement[0];
                                const dataset = ordervssupplyChart.data.datasets[element.datasetIndex];
                                // Reset all segments
                                dataset.borderWidth = dataset.borderWidth.map(() => 1);
                                dataset.borderColor = dataset.borderColor.map((color, i) =>
                                    i === element.index ? 'rgba(255, 255, 255, 0.8)' : dataset.borderColor[i]
                                );
                                dataset.borderWidth[element.index] = 6; // Thicker glowing border
                                ordervssupplyChart.update();
                            } else {
                                // Reset to default when not hovering
                                const dataset = ordervssupplyChart.data.datasets[0];
                                dataset.borderWidth = dataset.borderWidth.map(() => 1);
                                dataset.borderColor = ['rgba(46, 204, 113, 1)', 'rgba(231, 76, 60, 1)'];
                                ordervssupplyChart.update();
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });

        }

        // Financial Year Filter
        const financialYearSelect = document.getElementById('financial-year');
        financialYearSelect.addEventListener('change', function () {
            const selectedYear = this.value;
            const period = document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'monthly-btn' ? 'monthly' : document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'quarterly-btn' ? 'quarterly' : 'yearly';
            const salesType = document.querySelector('.dashboard-card:nth-child(2) .btn-primary')?.id === 'quantity-btn' ? 'quantity' : 'revenue';
            const orderType = document.querySelector('.dashboard-card:nth-child(3) .btn-primary')?.id === 'by-department-btn' ? 'byDepartment' : 'bySelf';
            const finishedToggle = document.getElementById('finished-toggle-btn')?.dataset.toggle || 'top';
            const emporiumToggle = document.getElementById('emporium-toggle-btn')?.dataset.toggle || 'top';

            // Update KPI values
            animateValue('production-value', parseInt(document.getElementById('production-value')?.textContent.replace(/,/g, '') || '0'), dataByFinancialYear[selectedYear].kpi.productionValue, 1500);
            animateValue('sales-value', parseInt(document.getElementById('sales-value')?.textContent.replace(/,/g, '') || '0'), dataByFinancialYear[selectedYear].kpi.salesValue, 1500);
            animateValue('orders-value', parseInt(document.getElementById('orders-value')?.textContent.replace(/,/g, '') || '0'), dataByFinancialYear[selectedYear].kpi.ordersValue, 1500);
            animateValue('stock-value', parseInt(document.getElementById('stock-value')?.textContent.replace(/,/g, '') || '0'), dataByFinancialYear[selectedYear].kpi.stockValue, 1500);

            // Update Finished Products Chart
            if (vindhyavalleyChart) {
                const dataKey = finishedToggle === 'top' ? 'finishedProducts' : 'belowFinishedProducts';
                vindhyavalleyChart.data.labels = dataByFinancialYear[selectedYear][dataKey][period].labels;
                vindhyavalleyChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][period].data;
                vindhyavalleyChart.data.datasets[0].label = finishedToggle === 'top' ? 'Quantity Produced (kg)' : 'Production (Lakhs)';
                vindhyavalleyChart.options.scales.y.title.text = finishedToggle === 'top' ? 'Quantity (Nos)' : 'Quantity (Nos)';
                vindhyavalleyChart.update();
                document.getElementById('finishedProductsTitle').textContent = finishedToggle === 'top' ? 'Top 5 Finished Products Sales' : 'Below 5 Finished Products Sales';
            }

            // Update Finished Products Chart
            if (finishedProductsChart) {
                const dataKey = finishedToggle === 'top' ? 'finishedProducts' : 'belowFinishedProducts';
                finishedProductsChart.data.labels = dataByFinancialYear[selectedYear][dataKey][period].labels;
                finishedProductsChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][period].data;
                finishedProductsChart.data.datasets[0].label = finishedToggle === 'top' ? 'Quantity Produced (kg)' : 'Production (Lakhs)';
                finishedProductsChart.options.scales.y.title.text = finishedToggle === 'top' ? 'Quantity (Nos)' : 'Quantity (Nos)';
                finishedProductsChart.update();
                document.getElementById('finishedProductsTitle').textContent = finishedToggle === 'top' ? 'Top 5 Finished Products Sales' : 'Below 5 Finished Products Sales';
            }

            // Update Emporium Sales Chart
            if (emporiumSalesChart) {
                const dataKey = emporiumToggle === 'top' ? 'emporiumSales' : 'belowEmporiumSales';
                emporiumSalesChart.data.labels = dataByFinancialYear[selectedYear][dataKey][salesType].labels;
                emporiumSalesChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][salesType].data;
                emporiumSalesChart.data.datasets[0].label = salesType === 'quantity' ? 'Units Sold' : 'Sales (₹)';
                emporiumSalesChart.options.plugins.tooltip.callbacks.label = function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                    return salesType === 'quantity'
                        ? `${label}: ${value} units (${percentage}%)`
                        : `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                };
                emporiumSalesChart.update();
                document.getElementById('emporiumSalesTitle').textContent = emporiumToggle === 'top' ? 'Top 5 Emporium Wise Sales' : 'Below 5 Emporium Wise Sales';
            }

            // Update Order vs Supply Chart
            if (ordervssupplyChart) {
                ordervssupplyChart.data.labels = dataByFinancialYear[selectedYear].orderVsSupply[orderType].labels;
                ordervssupplyChart.data.datasets[0].data = dataByFinancialYear[selectedYear].orderVsSupply[orderType].data;
                ordervssupplyChart.update();
                const totalOrders = dataByFinancialYear[selectedYear].orderVsSupply[orderType].data.reduce((a, b) => a + b, 0);
                animateValue('total-orders', parseInt(document.getElementById('total-orders').textContent.replace(/,/g, '') || '0'), totalOrders, 1000);
            }

            anime({
                targets: ['#finishedProductsChart', '#emporiumSalesChart', '#ordervssupplyChart', '.kpi-card'],
                scale: [0.95, 1],
                opacity: [0.8, 1],
                duration: 500
            });
        });

        // Toggle Button for Finished Products
        const finishedToggleBtn = document.getElementById('finished-toggle-btn');
        if (finishedToggleBtn) {
            finishedToggleBtn.addEventListener('click', function () {
                const toggleState = this.dataset.toggle === 'top' ? 'below' : 'top';
                this.dataset.toggle = toggleState;
                this.textContent = toggleState === 'top' ? 'Toggle to Below 5' : 'Toggle to Top 5';
                const selectedYear = financialYearSelect.value;
                const period = document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'monthly-btn' ? 'monthly' : document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'quarterly-btn' ? 'quarterly' : 'yearly';
                const dataKey = toggleState === 'top' ? 'finishedProducts' : 'belowFinishedProducts';

                if (finishedProductsChart) {
                    finishedProductsChart.data.labels = dataByFinancialYear[selectedYear][dataKey][period].labels;
                    finishedProductsChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][period].data;
                    finishedProductsChart.data.datasets[0].label = toggleState === 'top' ? 'Quantity Produced (kg)' : 'Production (Lakhs)';
                    finishedProductsChart.options.scales.y.title.text = toggleState === 'top' ? 'Quantity (Nos)' : 'Quantity (Nos)';
                    finishedProductsChart.update();
                    document.getElementById('finishedProductsTitle').textContent = toggleState === 'top' ? 'Top 5 Finished Products Sales' : 'Below 5 Finished Products Sales';
                }

                anime({
                    targets: '#finishedProductsChart',
                    scale: [0.95, 1],
                    opacity: [0.8, 1],
                    duration: 500
                });
            });
        }

        // Toggle Button for Emporium Sales
        const emporiumToggleBtn = document.getElementById('emporium-toggle-btn');
        if (emporiumToggleBtn) {
            emporiumToggleBtn.addEventListener('click', function () {
                const toggleState = this.dataset.toggle === 'top' ? 'below' : 'top';
                this.dataset.toggle = toggleState;
                this.textContent = toggleState === 'top' ? 'Toggle to Below 5' : 'Toggle to Top 5';
                const selectedYear = financialYearSelect.value;
                const salesType = document.querySelector('.dashboard-card:nth-child(2) .btn-primary')?.id === 'quantity-btn' ? 'quantity' : 'revenue';
                const dataKey = toggleState === 'top' ? 'emporiumSales' : 'belowEmporiumSales';

                if (emporiumSalesChart) {
                    emporiumSalesChart.data.labels = dataByFinancialYear[selectedYear][dataKey][salesType].labels;
                    emporiumSalesChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][salesType].data;
                    emporiumSalesChart.data.datasets[0].label = salesType === 'quantity' ? 'Units Sold' : 'Sales (₹)';
                    emporiumSalesChart.options.plugins.tooltip.callbacks.label = function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return salesType === 'quantity'
                            ? `${label}: ${value} units (${percentage}%)`
                            : `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                    };
                    emporiumSalesChart.update();
                    document.getElementById('emporiumSalesTitle').textContent = toggleState === 'top' ? 'Top 5 Emporium Wise Sales' : 'Below 5 Emporium Wise Sales';
                }

                anime({
                    targets: '#emporiumSalesChart',
                    scale: [0.95, 1],
                    opacity: [0.8, 1],
                    duration: 500
                });
            });
        }

        // Filter buttons for Finished Products Sales
        const periodButtons = document.querySelectorAll('.dashboard-card:nth-child(1) .btn:not(#finished-toggle-btn)');
        periodButtons.forEach(button => {
            button.addEventListener('click', function () {
                periodButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary');
                });
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-secondary');

                const period = this.id === 'monthly-btn' ? 'monthly' : this.id === 'quarterly-btn' ? 'quarterly' : 'yearly';
                const selectedYear = financialYearSelect.value;
                const toggleState = document.getElementById('finished-toggle-btn')?.dataset.toggle || 'top';
                const dataKey = toggleState === 'top' ? 'finishedProducts' : 'belowFinishedProducts';

                if (finishedProductsChart) {
                    finishedProductsChart.data.labels = dataByFinancialYear[selectedYear][dataKey][period].labels;
                    finishedProductsChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][period].data;
                    finishedProductsChart.data.datasets[0].label = toggleState === 'top' ? 'Quantity Produced (kg)' : 'Production (Lakhs)';
                    finishedProductsChart.options.scales.y.title.text = toggleState === 'top' ? 'Quantity (Nos)' : 'Production (Lakhs)';
                    finishedProductsChart.update();
                }

                anime({
                    targets: '#finishedProductsChart',
                    scale: [0.95, 1],
                    opacity: [0.8, 1],
                    duration: 500
                });
            });
        });

        // Filter buttons for Emporium Sales
        const salesButtons = document.querySelectorAll('.dashboard-card:nth-child(2) .btn:not(#emporium-toggle-btn)');
        salesButtons.forEach(button => {
            button.addEventListener('click', function () {
                salesButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary');
                });
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-secondary');

                const type = this.id === 'quantity-btn' ? 'quantity' : 'revenue';
                const selectedYear = financialYearSelect.value;
                const toggleState = document.getElementById('emporium-toggle-btn')?.dataset.toggle || 'top';
                const dataKey = toggleState === 'top' ? 'emporiumSales' : 'belowEmporiumSales';

                if (emporiumSalesChart) {
                    emporiumSalesChart.data.labels = dataByFinancialYear[selectedYear][dataKey][type].labels;
                    emporiumSalesChart.data.datasets[0].data = dataByFinancialYear[selectedYear][dataKey][type].data;
                    emporiumSalesChart.data.datasets[0].label = type === 'quantity' ? 'Units Sold' : 'Sales (₹)';
                    emporiumSalesChart.options.plugins.tooltip.callbacks.label = function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return type === 'quantity'
                            ? `${label}: ${value} units (${percentage}%)`
                            : `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                    };
                    emporiumSalesChart.update();
                }

                anime({
                    targets: '#emporiumSalesChart',
                    scale: [0.95, 1],
                    opacity: [0.8, 1],
                    duration: 500
                });
            });
        });

        // Filter buttons for Order vs Supply
        const orderButtons = document.querySelectorAll('.dashboard-card:nth-child(3) .btn');
        orderButtons.forEach(button => {
            button.addEventListener('click', function () {
                orderButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary');
                });
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-secondary');

                const type = this.id === 'by-department-btn' ? 'byDepartment' : 'bySelf';
                const selectedYear = financialYearSelect.value;
                if (ordervssupplyChart) {
                    ordervssupplyChart.data.labels = dataByFinancialYear[selectedYear].orderVsSupply[type].labels;
                    ordervssupplyChart.data.datasets[0].data = dataByFinancialYear[selectedYear].orderVsSupply[type].data;
                    ordervssupplyChart.data.datasets[0].label = 'Orders';
                    ordervssupplyChart.options.plugins.tooltip.callbacks.label = function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value.toLocaleString('en-IN')} orders (${percentage}%)`;
                    };
                    ordervssupplyChart.update();
                }

                const totalOrders = dataByFinancialYear[selectedYear].orderVsSupply[type].data.reduce((a, b) => a + b, 0);
                animateValue('total-orders', parseInt(document.getElementById('total-orders').textContent.replace(/,/g, '') || '0'), totalOrders, 1000);

                anime({
                    targets: '#ordervssupplyChart',
                    scale: [0.95, 1],
                    opacity: [0.8, 1],
                    duration: 500
                });
            });
        });

        // Filter buttons for Plant Production & Stock
        const plantButtons = document.querySelectorAll('.dashboard-card:nth-child(4) .btn');
        const plantTableBody = document.querySelector('#plant-table tbody');

        plantButtons.forEach(button => {
            button.addEventListener('click', function () {
                plantButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary');
                });
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-secondary');

                const isProduction = this.id === 'production-btn';
                const tableRows = plantTableBody?.querySelectorAll('tr') || [];

                tableRows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length < 5) return;
                    const production = parseInt(cells[1].textContent) || 0;
                    const capacity = parseInt(cells[2].textContent) || 1;
                    const stock = parseInt(cells[3].textContent) || 0;

                    if (isProduction) {
                        cells[3].style.display = 'none';
                        cells[1].style.display = '';
                        cells[4].innerHTML = getStatusBadge(production, capacity, true);
                    } else {
                        cells[1].style.display = 'none';
                        cells[3].style.display = '';
                        cells[4].innerHTML = getStatusBadge(stock, 400, false);
                    }
                });

                anime({
                    targets: '#plant-table tr',
                    translateX: [-10, 0],
                    opacity: [0.7, 1],
                    duration: 500,
                    delay: anime.stagger(100)
                });
            });
        });

        function getStatusBadge(value, threshold, isProduction) {
            if (isProduction) {
                const percentage = (value / threshold) * 100;
                if (percentage >= 90) {
                    return '<span class="badge bg-success"><i class="fas fa-check-circle me-1"></i>Adequate</span>';
                } else if (percentage >= 70) {
                    return '<span class="badge bg-warning"><i class="fas fa-exclamation-circle me-1"></i>Moderate</span>';
                } else {
                    return '<span class="badge bg-danger"><i class="fas fa-times-circle me-1"></i>Low</span>';
                }
            } else {
                if (value >= 300) {
                    return '<span class="badge bg-success"><i class="fas fa-check-circle me-1"></i>Adequate</span>';
                } else if (value >= 150) {
                    return '<span class="badge bg-warning"><i class="fas fa-exclamation-circle me-1"></i>Low</span>';
                } else {
                    return '<span class="badge bg-danger"><i class="fas fa-times-circle me-1"></i>Critical</span>';
                }
            }
        }

        // Real-time updates with dynamic data
        setInterval(() => {
            const selectedYear = financialYearSelect.value;
            const period = document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'monthly-btn' ? 'monthly' : document.querySelector('.dashboard-card:nth-child(1) .btn-primary')?.id === 'quarterly-btn' ? 'quarterly' : 'yearly';
            const salesType = document.querySelector('.dashboard-card:nth-child(2) .btn-primary')?.id === 'quantity-btn' ? 'quantity' : 'revenue';
            const orderType = document.querySelector('.dashboard-card:nth-child(3) .btn-primary')?.id === 'by-department-btn' ? 'byDepartment' : 'bySelf';
            const finishedToggle = document.getElementById('finished-toggle-btn')?.dataset.toggle || 'top';
            const emporiumToggle = document.getElementById('emporium-toggle-btn')?.dataset.toggle || 'top';

            // Update KPI values
            const newProductionValue = Math.max(710, Math.min(710, dataByFinancialYear[selectedYear].kpi.productionValue + (Math.random() * 50 - 25)));
            animateValue('production-value', parseInt(document.getElementById('production-value')?.textContent.replace(/,/g, '') || '0'), Math.floor(newProductionValue), 1500);
            const newSalesValue = Math.max(292, Math.min(292, dataByFinancialYear[selectedYear].kpi.salesValue + (Math.random() * 20 - 10)));
            animateValue('sales-value', parseInt(document.getElementById('sales-value')?.textContent.replace(/,/g, '') || '0'), Math.floor(newSalesValue), 1500);
            const newOrdersValue = Math.max(5, Math.min(5, dataByFinancialYear[selectedYear].kpi.ordersValue + (Math.random() * 20 - 10)));
            animateValue('orders-value', parseInt(document.getElementById('orders-value')?.textContent.replace(/,/g, '') || '0'), Math.floor(newOrdersValue), 1500);
            const newStockValue = Math.max(1064, Math.min(1064, dataByFinancialYear[selectedYear].kpi.stockValue + (Math.random() * 50 - 25)));
            animateValue('stock-value', parseInt(document.getElementById('stock-value')?.textContent.replace(/,/g, '') || '0'), Math.floor(newStockValue), 1500);

            // Update chart data
            const finishedDataKey = finishedToggle === 'top' ? 'finishedProducts' : 'belowFinishedProducts';
            dataByFinancialYear[selectedYear][finishedDataKey][period].data = dataByFinancialYear[selectedYear][finishedDataKey][period].data.map(value =>
                Math.max(value * 0.8, Math.min(value * 1.2, value + (Math.random() * value * 0.1 - value * 0.05)))
            );
            const emporiumDataKey = emporiumToggle === 'top' ? 'emporiumSales' : 'belowEmporiumSales';
            dataByFinancialYear[selectedYear][emporiumDataKey][salesType].data = dataByFinancialYear[selectedYear][emporiumDataKey][salesType].data.map(value =>
                Math.max(value * 0.8, Math.min(value * 1.2, value + (Math.random() * value * 0.1 - value * 0.05)))
            );
            dataByFinancialYear[selectedYear].orderVsSupply[orderType].data = dataByFinancialYear[selectedYear].orderVsSupply[orderType].data.map(value =>
                Math.max(value * 0.8, Math.min(value * 1.2, value + (Math.random() * value * 0.1 - value * 0.05)))
            );

            if (finishedProductsChart) {
                finishedProductsChart.data.labels = dataByFinancialYear[selectedYear][finishedDataKey][period].labels;
                finishedProductsChart.data.datasets[0].data = dataByFinancialYear[selectedYear][finishedDataKey][period].data;
                finishedProductsChart.data.datasets[0].label = finishedToggle === 'top' ? 'Quantity Produced (kg)' : 'Production (Lakhs)';
                finishedProductsChart.options.scales.y.title.text = finishedToggle === 'top' ? 'Quantity (Nos)' : 'Production (Lakhs)';
                finishedProductsChart.update();
            }

            if (emporiumSalesChart) {
                emporiumSalesChart.data.labels = dataByFinancialYear[selectedYear][emporiumDataKey][salesType].labels;
                emporiumSalesChart.data.datasets[0].data = dataByFinancialYear[selectedYear][emporiumDataKey][salesType].data;
                emporiumSalesChart.update();
            }

            if (ordervssupplyChart) {
                ordervssupplyChart.data.datasets[0].data = dataByFinancialYear[selectedYear].orderVsSupply[orderType].data;
                ordervssupplyChart.update();
                const totalOrders = dataByFinancialYear[selectedYear].orderVsSupply[orderType].data.reduce((a, b) => a + b, 0);
                animateValue('total-orders', parseInt(document.getElementById('total-orders').textContent.replace(/,/g, '') || '0'), Math.round(totalOrders), 1000);
            }

            // Update Plant Table
            const tableRows = plantTableBody?.querySelectorAll('tr') || [];
            const isProductionView = document.querySelector('#production-btn')?.classList.contains('btn-primary') || false;

            tableRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length < 5) return;
                let production = parseInt(cells[1].textContent) || 0;
                let stock = parseInt(cells[3].textContent) || 0;

                production = Math.max(production * 0.9, Math.min(production * 1.1, production + (Math.random() * 100 - 50)));
                stock = Math.max(stock * 0.9, Math.min(stock * 1.1, stock + (Math.random() * 50 - 25)));

                cells[1].textContent = Math.round(production);
                cells[3].textContent = Math.round(stock);

                const capacity = parseInt(cells[2].textContent) || 1;
                cells[4].innerHTML = isProductionView
                    ? getStatusBadge(production, capacity, true)
                    : getStatusBadge(stock, 400, false);
            });

            anime({
                targets: ['#finishedProductsChart', '#emporiumSalesChart', '#ordervssupplyChart', '#plant-table'],
                scale: [0.98, 1],
                opacity: [0.9, 1],
                duration: 1000
            });
        }, 15000);
        });
 
